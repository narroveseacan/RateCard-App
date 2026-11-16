import "server-only";
import { prisma } from "@/lib/db";
import { decryptSecret, encryptSecret } from "@/lib/crypto";

// TikTok Login Kit + Display API v2
const AUTH_URL = "https://www.tiktok.com/v2/auth/authorize/";
const API = "https://open.tiktokapis.com/v2";
export const TIKTOK_SCOPES = "user.info.basic,video.list";
const QUERY_BATCH = 20; // batas video_ids per request /v2/video/query/
const REFRESH_SKEW_MS = 60 * 60 * 1000; // segarkan bila sisa < 1 jam

export type TikTokVideo = {
  id: string;
  title?: string;
  video_description?: string;
  duration?: number;
  cover_image_url?: string;
  embed_link?: string;
  create_time?: number;
};

type TokenResponse = {
  access_token: string;
  expires_in: number;
  open_id: string;
  refresh_token: string;
  refresh_expires_in: number;
  scope: string;
  token_type: string;
};

export class TikTokError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message);
  }
}

function env(name: "TIKTOK_CLIENT_KEY" | "TIKTOK_CLIENT_SECRET" | "TIKTOK_REDIRECT_URI") {
  const v = process.env[name];
  if (!v) throw new TikTokError(`${name} belum diset di environment`, "config");
  return v;
}

export const isTikTokConfigured = () =>
  Boolean(process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET && process.env.TIKTOK_REDIRECT_URI);

export function buildAuthorizeUrl(state: string) {
  const u = new URL(AUTH_URL);
  u.searchParams.set("client_key", env("TIKTOK_CLIENT_KEY"));
  u.searchParams.set("scope", TIKTOK_SCOPES);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("redirect_uri", env("TIKTOK_REDIRECT_URI"));
  u.searchParams.set("state", state);
  return u.toString();
}

async function tokenRequest(params: Record<string, string>): Promise<TokenResponse> {
  const res = await fetch(`${API}/oauth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Cache-Control": "no-cache" },
    body: new URLSearchParams({
      client_key: env("TIKTOK_CLIENT_KEY"),
      client_secret: env("TIKTOK_CLIENT_SECRET"),
      ...params,
    }),
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error || !json.access_token) {
    throw new TikTokError(json.error_description || json.error || `Token request gagal (${res.status})`, json.error);
  }
  return json as TokenResponse;
}

export const exchangeCode = (code: string) =>
  tokenRequest({ code, grant_type: "authorization_code", redirect_uri: env("TIKTOK_REDIRECT_URI") });

const refreshAccessToken = (refreshToken: string) =>
  tokenRequest({ grant_type: "refresh_token", refresh_token: refreshToken });

async function apiCall<T>(path: string, token: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: init?.method ?? "GET",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || (json.error && json.error.code && json.error.code !== "ok")) {
    throw new TikTokError(json.error?.message || `TikTok API ${path} gagal (${res.status})`, json.error?.code);
  }
  return json.data as T;
}

export async function fetchUserInfo(token: string) {
  const data = await apiCall<{ user: { open_id: string; union_id?: string; avatar_url?: string; display_name: string } }>(
    "/user/info/?fields=open_id,union_id,avatar_url,display_name",
    token,
  );
  return data.user;
}

export async function listVideos(token: string, cursor?: number) {
  return apiCall<{ videos: TikTokVideo[]; cursor: number; has_more: boolean }>(
    "/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link,create_time",
    token,
    { method: "POST", body: { max_count: 20, ...(cursor ? { cursor } : {}) } },
  );
}

export async function queryVideos(token: string, ids: string[]) {
  const out: TikTokVideo[] = [];
  for (let i = 0; i < ids.length; i += QUERY_BATCH) {
    const data = await apiCall<{ videos: TikTokVideo[] }>(
      "/video/query/?fields=id,cover_image_url,embed_link,duration,title",
      token,
      { method: "POST", body: { filters: { video_ids: ids.slice(i, i + QUERY_BATCH) } } },
    );
    out.push(...(data.videos ?? []));
  }
  return out;
}

/** Simpan hasil OAuth callback (token terenkripsi). Satu akun @perbekasian saja. */
export async function saveIntegration(tok: TokenResponse) {
  const user = await fetchUserInfo(tok.access_token);
  const now = Date.now();
  const data = {
    unionId: user.union_id ?? null,
    displayName: user.display_name,
    avatarUrl: user.avatar_url ?? null,
    accessTokenEncrypted: encryptSecret(tok.access_token),
    refreshTokenEncrypted: encryptSecret(tok.refresh_token),
    scopes: tok.scope,
    accessTokenExpiresAt: new Date(now + tok.expires_in * 1000),
    refreshTokenExpiresAt: new Date(now + tok.refresh_expires_in * 1000),
    lastSyncedAt: new Date(),
    lastError: null,
    revokedAt: null,
  };
  await prisma.tikTokIntegration.deleteMany({ where: { openId: { not: tok.open_id } } });
  return prisma.tikTokIntegration.upsert({
    where: { openId: tok.open_id },
    create: { openId: tok.open_id, ...data },
    update: data,
  });
}

export async function getIntegration() {
  return prisma.tikTokIntegration.findFirst({ orderBy: { updatedAt: "desc" } });
}

export type ConnectionStatus = "connected" | "disconnected" | "expired" | "error";

export function connectionStatus(i: Awaited<ReturnType<typeof getIntegration>>): ConnectionStatus {
  if (!i) return "disconnected";
  if (i.revokedAt || i.refreshTokenExpiresAt.getTime() < Date.now()) return "expired";
  if (i.lastError) return "error";
  return "connected";
}

/** Kembalikan access token valid; refresh otomatis bila hampir habis. */
export async function getValidAccessToken(force = false): Promise<{ token: string; refreshed: boolean }> {
  const i = await getIntegration();
  if (!i) throw new TikTokError("Akun TikTok belum terhubung", "not_connected");
  if (i.revokedAt || i.refreshTokenExpiresAt.getTime() < Date.now()) {
    throw new TikTokError("Refresh token kedaluwarsa atau dicabut", "refresh_expired");
  }
  if (!force && i.accessTokenExpiresAt.getTime() - Date.now() > REFRESH_SKEW_MS) {
    return { token: decryptSecret(i.accessTokenEncrypted), refreshed: false };
  }
  try {
    const tok = await refreshAccessToken(decryptSecret(i.refreshTokenEncrypted));
    const now = Date.now();
    await prisma.tikTokIntegration.update({
      where: { id: i.id },
      data: {
        accessTokenEncrypted: encryptSecret(tok.access_token),
        refreshTokenEncrypted: encryptSecret(tok.refresh_token),
        accessTokenExpiresAt: new Date(now + tok.expires_in * 1000),
        refreshTokenExpiresAt: new Date(now + tok.refresh_expires_in * 1000),
        scopes: tok.scope || i.scopes,
        lastError: null,
      },
    });
    return { token: tok.access_token, refreshed: true };
  } catch (e) {
    const err = e as TikTokError;
    const revoked = err.code === "invalid_grant" || err.code === "access_token_invalid";
    await prisma.tikTokIntegration.update({
      where: { id: i.id },
      data: { lastError: err.message, ...(revoked ? { revokedAt: new Date() } : {}) },
    });
    throw err;
  }
}

/** Token refresh + segarkan cover_image_url & embed_link semua episode bertautan (batch). */
export async function runTikTokSync(trigger: "cron" | "manual" | "cover-fallback", onlyIds?: string[]) {
  let tokenRefreshed = false;
  try {
    const { token, refreshed } = await getValidAccessToken(trigger === "cron");
    tokenRefreshed = refreshed;
    const episodes = await prisma.episode.findMany({
      where: { tiktokVideoId: onlyIds ? { in: onlyIds } : { not: null } },
      select: { id: true, tiktokVideoId: true },
    });
    const ids = episodes.map((e) => e.tiktokVideoId!).filter(Boolean);
    let updated = 0;
    if (ids.length) {
      const videos = await queryVideos(token, ids);
      const now = new Date();
      for (const v of videos) {
        await prisma.episode.update({
          where: { tiktokVideoId: v.id },
          data: {
            tiktokCoverUrl: v.cover_image_url ?? undefined,
            tiktokEmbedLink: v.embed_link ?? undefined,
            tiktokDurationSec: v.duration ?? undefined,
            coverLastRefreshed: now,
          },
        });
        updated++;
      }
    }
    const i = await getIntegration();
    if (i) await prisma.tikTokIntegration.update({ where: { id: i.id }, data: { lastSyncedAt: new Date(), lastError: null } });
    const status = updated === ids.length ? "SUCCESS" : "PARTIAL";
    await prisma.syncLog.create({
      data: { trigger, status, tokenRefreshed, videosUpdated: updated, message: `${updated}/${ids.length} video diperbarui` },
    });
    return { ok: true as const, tokenRefreshed, updated, total: ids.length };
  } catch (e) {
    const err = e as TikTokError;
    const skipped = err.code === "not_connected" || err.code === "config";
    await prisma.syncLog.create({
      data: { trigger, status: skipped ? "SKIPPED" : "FAILED", tokenRefreshed, message: err.message },
    });
    return { ok: false as const, error: err.message, code: err.code };
  }
}

/** URL embed: pakai embed_link dari API, fallback ke player v1 bila hanya ada ID. */
export function embedSrc(embedLink?: string | null, videoId?: string | null) {
  if (embedLink) return embedLink;
  if (videoId) return `https://www.tiktok.com/player/v1/${videoId}?music_info=0&description=0`;
  return null;
}

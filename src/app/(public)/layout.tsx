import { SiteFooter } from "@/components/SiteHeader";
import { getSettings } from "@/lib/data";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <>
      {children}
      <SiteFooter instagramUrl={s.instagramUrl} tiktokUrl={s.tiktokUrl} email={s.businessEmail} />
    </>
  );
}

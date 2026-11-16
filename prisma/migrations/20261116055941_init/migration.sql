-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('SUCCESS', 'PARTIAL', 'FAILED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('ENDORSE', 'PAID_PROMOTE', 'BUNDLE', 'ADDON');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('FIXED', 'PERCENT');

-- CreateEnum
CREATE TYPE "PaymentScheme" AS ENUM ('FULL_UPFRONT', 'DP_50_SPLIT');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('SUBMITTED', 'IN_DISCUSSION', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TikTokIntegration" (
    "id" TEXT NOT NULL,
    "openId" TEXT NOT NULL,
    "unionId" TEXT,
    "displayName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "accessTokenEncrypted" TEXT NOT NULL,
    "refreshTokenEncrypted" TEXT NOT NULL,
    "scopes" TEXT NOT NULL,
    "accessTokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "refreshTokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastError" TEXT,
    "revokedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TikTokIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncLog" (
    "id" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" "SyncStatus" NOT NULL,
    "tokenRefreshed" BOOLEAN NOT NULL DEFAULT false,
    "videosUpdated" INTEGER NOT NULL DEFAULT 0,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountMetricSnapshot" (
    "id" TEXT NOT NULL,
    "periodLabel" TEXT NOT NULL,
    "totalViewsLabel" TEXT NOT NULL,
    "igViews" INTEGER NOT NULL,
    "tiktokViews" INTEGER NOT NULL,
    "igReach" INTEGER NOT NULL,
    "igInteractions" INTEGER NOT NULL DEFAULT 0,
    "igProfileVisits" INTEGER NOT NULL DEFAULT 0,
    "igEngagementRate" DOUBLE PRECISION NOT NULL,
    "tiktokEngagement" DOUBLE PRECISION NOT NULL,
    "tiktokUniqueViewers" INTEGER NOT NULL DEFAULT 0,
    "tiktokLikes" INTEGER NOT NULL DEFAULT 0,
    "tiktokShares" INTEGER NOT NULL DEFAULT 0,
    "igFollowers" INTEGER NOT NULL,
    "tiktokFollowers" INTEGER NOT NULL,
    "audienceAge25To44" DOUBLE PRECISION NOT NULL,
    "audienceIndonesia" DOUBLE PRECISION NOT NULL,
    "igMalePct" DOUBLE PRECISION NOT NULL DEFAULT 60,
    "tiktokMalePct" DOUBLE PRECISION NOT NULL DEFAULT 79,
    "igAgeJson" JSONB,
    "tiktokAgeJson" JSONB,
    "methodologyNote" TEXT,
    "introPriceValidTo" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountMetricSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "businessWa" TEXT,
    "businessEmail" TEXT,
    "instagramUrl" TEXT,
    "tiktokUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentSeries" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ContentSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "episodeCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "factSources" TEXT,
    "tiktokVideoId" TEXT,
    "tiktokCoverUrl" TEXT,
    "tiktokEmbedLink" TEXT,
    "tiktokDurationSec" INTEGER,
    "coverLastRefreshed" TIMESTAMP(3),
    "igReelsUrl" TEXT,
    "highlightViewsLabel" TEXT,
    "isFeaturedCaseStudy" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateProduct" (
    "id" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "category" TEXT,
    "platform" TEXT NOT NULL,
    "affiliateUrl" TEXT NOT NULL,
    "ctaText" TEXT NOT NULL,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AffiliateProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateCardService" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "category" "ServiceCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deliverables" TEXT[],
    "basePriceIdr" INTEGER NOT NULL,
    "compareAtPriceIdr" INTEGER,
    "pricingType" "PricingType" NOT NULL DEFAULT 'FIXED',
    "percentOfContent" INTEGER,
    "unitLabel" TEXT NOT NULL,
    "badge" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RateCardService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingInquiry" (
    "id" TEXT NOT NULL,
    "referenceCode" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "brandIndustry" TEXT NOT NULL,
    "picName" TEXT NOT NULL,
    "picContact" TEXT NOT NULL,
    "contactChannel" TEXT NOT NULL DEFAULT 'whatsapp',
    "selectedItemsJson" JSONB NOT NULL,
    "isRetainer3Months" BOOLEAN NOT NULL DEFAULT false,
    "subtotalIdr" INTEGER NOT NULL,
    "discountIdr" INTEGER NOT NULL,
    "totalEstimateIdr" INTEGER NOT NULL,
    "paymentScheme" "PaymentScheme" NOT NULL,
    "briefSummary" TEXT NOT NULL,
    "targetPublishDate" TIMESTAMP(3),
    "policyAccepted" BOOLEAN NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'SUBMITTED',
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TikTokIntegration_openId_key" ON "TikTokIntegration"("openId");

-- CreateIndex
CREATE INDEX "SyncLog_createdAt_idx" ON "SyncLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ContentSeries_slug_key" ON "ContentSeries"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_slug_key" ON "Episode"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_tiktokVideoId_key" ON "Episode"("tiktokVideoId");

-- CreateIndex
CREATE INDEX "Episode_seriesId_publishedAt_idx" ON "Episode"("seriesId", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "RateCardService_code_key" ON "RateCardService"("code");

-- CreateIndex
CREATE UNIQUE INDEX "BookingInquiry_referenceCode_key" ON "BookingInquiry"("referenceCode");

-- CreateIndex
CREATE INDEX "BookingInquiry_createdAt_idx" ON "BookingInquiry"("createdAt");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "ContentSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateProduct" ADD CONSTRAINT "AffiliateProduct_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

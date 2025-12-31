-- CreateTable
CREATE TABLE "Wish" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "anonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishLike" (
    "id" TEXT NOT NULL,
    "wishId" TEXT NOT NULL,
    "anonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wish_anonId_key" ON "Wish"("anonId");

-- CreateIndex
CREATE UNIQUE INDEX "WishLike_wishId_anonId_key" ON "WishLike"("wishId", "anonId");

-- AddForeignKey
ALTER TABLE "WishLike" ADD CONSTRAINT "WishLike_wishId_fkey" FOREIGN KEY ("wishId") REFERENCES "Wish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

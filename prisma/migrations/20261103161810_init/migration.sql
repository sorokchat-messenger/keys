-- CreateTable
CREATE TABLE "identity_keys" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "identity_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_packages" (
    "id" TEXT NOT NULL,
    "identity_key_id" TEXT NOT NULL,
    "init_key" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "is_last_resort" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "key_packages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "identity_keys_user_id_key" ON "identity_keys"("user_id");

-- CreateIndex
CREATE INDEX "key_packages_user_id_is_last_resort_idx" ON "key_packages"("user_id", "is_last_resort");

-- AddForeignKey
ALTER TABLE "key_packages" ADD CONSTRAINT "key_packages_identity_key_id_fkey" FOREIGN KEY ("identity_key_id") REFERENCES "identity_keys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

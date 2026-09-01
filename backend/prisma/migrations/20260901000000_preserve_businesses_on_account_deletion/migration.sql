-- Preserve operational business and queue records after a merchant deletes
-- their personal QueueWise account. Ownership is detached by the foreign key.
ALTER TABLE "Business" DROP CONSTRAINT "Business_merchantId_fkey";

ALTER TABLE "Business" ALTER COLUMN "merchantId" DROP NOT NULL;

ALTER TABLE "Business"
ADD CONSTRAINT "Business_merchantId_fkey"
FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

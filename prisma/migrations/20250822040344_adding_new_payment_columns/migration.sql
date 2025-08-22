/*
  Warnings:

  - Added the required column `amount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "external_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payment_url" TEXT NOT NULL,
    "paid_amount" INTEGER,
    "paid_date" DATETIME,
    "amount" INTEGER NOT NULL,
    "payment_fee" INTEGER NOT NULL,
    "return_url" TEXT NOT NULL,
    "success_url" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'PIX',
    "dev_mode" BOOLEAN NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "Payment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("dev_mode", "id", "method", "paid_amount", "payment_fee", "payment_url", "product_id", "return_url", "status", "success_url") SELECT "dev_mode", "id", "method", "paid_amount", "payment_fee", "payment_url", "product_id", "return_url", "status", "success_url" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
CREATE UNIQUE INDEX "Payment_external_id_key" ON "Payment"("external_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

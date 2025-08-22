-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "payment_url" TEXT NOT NULL,
    "paid_amount" INTEGER,
    "payment_fee" INTEGER NOT NULL,
    "return_url" TEXT NOT NULL,
    "success_url" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'PIX',
    "dev_mode" BOOLEAN NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "Payment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

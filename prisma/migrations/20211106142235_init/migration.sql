-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "transaction_type" SMALLINT NOT NULL,
    "date_occurrence" DATE NOT NULL,
    "movement_value" DOUBLE PRECISION NOT NULL,
    "card" VARCHAR(12) NOT NULL,
    "time_occurrence" TIME NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "owner" VARCHAR(14) NOT NULL,
    "store_name" VARCHAR(19) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

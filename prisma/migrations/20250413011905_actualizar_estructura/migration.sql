/*
  Warnings:

  - The values [REPROGRAMADA] on the enum `EstadoReserva` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Proveedor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Made the column `proveedorId` on table `Reserva` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EstadoReserva_new" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA');
ALTER TABLE "Reserva" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Reserva" ALTER COLUMN "estado" TYPE "EstadoReserva_new" USING ("estado"::text::"EstadoReserva_new");
ALTER TYPE "EstadoReserva" RENAME TO "EstadoReserva_old";
ALTER TYPE "EstadoReserva_new" RENAME TO "EstadoReserva";
DROP TYPE "EstadoReserva_old";
ALTER TABLE "Reserva" ALTER COLUMN "estado" SET DEFAULT 'PENDIENTE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_proveedorId_fkey";

-- AlterTable
ALTER TABLE "Proveedor" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reserva" ALTER COLUMN "proveedorId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_userId_key" ON "Proveedor"("userId");

-- AddForeignKey
ALTER TABLE "Proveedor" ADD CONSTRAINT "Proveedor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

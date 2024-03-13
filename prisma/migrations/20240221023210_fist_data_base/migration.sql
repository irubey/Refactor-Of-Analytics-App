/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Tick` table. All the data in the column will be lost.
  - You are about to drop the column `favoritedById` on the `Tick` table. All the data in the column will be lost.
  - You are about to drop the column `userRating` on the `Tick` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToTick` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `Tick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routeId` to the `Tick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Tick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('NEW_USER', 'ATHELETE', 'COACH', 'ADMIN');

-- CreateEnum
CREATE TYPE "Discipline" AS ENUM ('SPORT', 'TRAD', 'BOULDER', 'MIXED', 'ICE', 'ALPINE', 'AID', 'TOP_ROPE', 'SOLO', 'SPEED', 'COMP_BOULDER', 'COMP_SPORT');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('TIRED', 'WEAK', 'TWEAKY', 'AVERAGE', 'STRONG');

-- CreateEnum
CREATE TYPE "AscentStyle" AS ENUM ('LEAD', 'TOP_ROPE', 'SOLO', 'BOULDER');

-- CreateEnum
CREATE TYPE "LeadStyle" AS ENUM ('ONSIGHT', 'FLASH', 'REDPOINT', 'PINKPOINT', 'WORKED', 'REDPOINT_ATTEMPT', 'REPEAT');

-- CreateEnum
CREATE TYPE "Danger" AS ENUM ('G', 'PG', 'PG13', 'R', 'X');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('WINTER', 'SPRING', 'SUMMER', 'FALL');

-- DropForeignKey
ALTER TABLE "Tick" DROP CONSTRAINT "Tick_favoritedById_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTick" DROP CONSTRAINT "_CategoryToTick_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTick" DROP CONSTRAINT "_CategoryToTick_B_fkey";

-- AlterTable
ALTER TABLE "Tick" DROP COLUMN "averageRating",
DROP COLUMN "favoritedById",
DROP COLUMN "userRating",
ADD COLUMN     "ascentStyle" "AscentStyle",
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "danger" "Danger",
ADD COLUMN     "discipline" "Discipline",
ADD COLUMN     "grade" TEXT,
ADD COLUMN     "leadStyle" "LeadStyle",
ADD COLUMN     "length" DOUBLE PRECISION,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "multipitch" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "quality" DOUBLE PRECISION,
ADD COLUMN     "routeId" TEXT NOT NULL,
ADD COLUMN     "sends" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastLoggedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "lastProfileUpdate" TIMESTAMP(3),
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'NEW_USER',
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userPreferences" ADD COLUMN     "darkMode" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "privacySettings" TEXT NOT NULL DEFAULT 'public',
ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT 'UTC',
ALTER COLUMN "emailUpdates" SET DEFAULT true;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToTick";

-- CreateTable
CREATE TABLE "UserRelationships" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "UserRelationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "energy" "Energy",
    "notes" TEXT,
    "authorId" TEXT NOT NULL,
    "locationId" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "multipitch" BOOLEAN NOT NULL DEFAULT false,
    "grade" TEXT NOT NULL,
    "discipline" "Discipline" NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "quality" DOUBLE PRECISION NOT NULL,
    "danger" "Danger" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "description" TEXT,
    "gps" TEXT NOT NULL,
    "indoors" BOOLEAN NOT NULL DEFAULT false,
    "facilities" TEXT,
    "approach" TEXT,
    "altitude" DOUBLE PRECISION,
    "images" TEXT[],
    "inSeason" "Season",
    "areaGroupId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,

    CONSTRAINT "AreaGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeConversionCode" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "grades" TEXT[],

    CONSTRAINT "GradeConversionCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SessionToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RouteToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AreaGroupToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TagsToTick" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TagsTouserPreferences" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_gps_key" ON "Location"("gps");

-- CreateIndex
CREATE UNIQUE INDEX "AreaGroup_name_key" ON "AreaGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SessionToTags_AB_unique" ON "_SessionToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_SessionToTags_B_index" ON "_SessionToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RouteToTags_AB_unique" ON "_RouteToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_RouteToTags_B_index" ON "_RouteToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToTags_AB_unique" ON "_LocationToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToTags_B_index" ON "_LocationToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AreaGroupToTags_AB_unique" ON "_AreaGroupToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_AreaGroupToTags_B_index" ON "_AreaGroupToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToTick_AB_unique" ON "_TagsToTick"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToTick_B_index" ON "_TagsToTick"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagsTouserPreferences_AB_unique" ON "_TagsTouserPreferences"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsTouserPreferences_B_index" ON "_TagsTouserPreferences"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "UserRelationships" ADD CONSTRAINT "UserRelationships_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelationships" ADD CONSTRAINT "UserRelationships_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelationships" ADD CONSTRAINT "UserRelationships_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tick" ADD CONSTRAINT "Tick_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tick" ADD CONSTRAINT "Tick_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tick" ADD CONSTRAINT "Tick_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_areaGroupId_fkey" FOREIGN KEY ("areaGroupId") REFERENCES "AreaGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionToTags" ADD CONSTRAINT "_SessionToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionToTags" ADD CONSTRAINT "_SessionToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RouteToTags" ADD CONSTRAINT "_RouteToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RouteToTags" ADD CONSTRAINT "_RouteToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToTags" ADD CONSTRAINT "_LocationToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToTags" ADD CONSTRAINT "_LocationToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaGroupToTags" ADD CONSTRAINT "_AreaGroupToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "AreaGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaGroupToTags" ADD CONSTRAINT "_AreaGroupToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTick" ADD CONSTRAINT "_TagsToTick_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTick" ADD CONSTRAINT "_TagsToTick_B_fkey" FOREIGN KEY ("B") REFERENCES "Tick"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsTouserPreferences" ADD CONSTRAINT "_TagsTouserPreferences_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsTouserPreferences" ADD CONSTRAINT "_TagsTouserPreferences_B_fkey" FOREIGN KEY ("B") REFERENCES "userPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

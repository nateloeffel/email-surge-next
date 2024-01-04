/*
  Warnings:

  - A unique constraint covering the columns `[linkedin_url]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_linkedin_url_key" ON "UserProfile"("linkedin_url");

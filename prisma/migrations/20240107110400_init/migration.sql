-- CreateTable
CREATE TABLE "story" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "file" BYTEA NOT NULL,

    CONSTRAINT "story_pkey" PRIMARY KEY ("id")
);

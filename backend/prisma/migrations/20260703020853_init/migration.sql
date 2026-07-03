-- CreateTable
CREATE TABLE "leaderboard" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "time" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,

    CONSTRAINT "leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maps" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_on_map" (
    "id" SERIAL NOT NULL,
    "coords" JSONB NOT NULL,
    "mapId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "character_on_map_pkey" PRIMARY KEY ("mapId","characterId")
);

-- CreateIndex
CREATE UNIQUE INDEX "character_on_map_id_key" ON "character_on_map"("id");

-- AddForeignKey
ALTER TABLE "leaderboard" ADD CONSTRAINT "leaderboard_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "maps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_on_map" ADD CONSTRAINT "character_on_map_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "maps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_on_map" ADD CONSTRAINT "character_on_map_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

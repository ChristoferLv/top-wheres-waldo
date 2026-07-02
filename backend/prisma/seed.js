import { prisma } from '../lib/prisma.js';
import 'dotenv/config';
import bcrypt from 'bcryptjs';


async function main() {
  await prisma.character_on_map.deleteMany();
  await prisma.leaderboard.deleteMany();
  await prisma.characters.deleteMany();
  await prisma.maps.deleteMany();

  const characters = await prisma.characters.createManyAndReturn({
    data: [
      { id: 1, name: "Waldo" },
      { id: 2, name: "Wenda" },
      { id: 3, name: "Woof" },
      { id: 4, name: "Wizard" },
      { id: 5, name: "Odlaw" }
    ]
  });

  const maps = await prisma.maps.createManyAndReturn({
    data: [
      { id: 1, name: "Beach" },
      { id: 2, name: "Moon Base" }
    ]
  });

  const charactersOnMaps = await prisma.character_on_map.createManyAndReturn({
    data: [
      {
        characterId: 1,
        mapId: 1,
        coords: { tlx: 746, tly: 220, brx: 759, bry: 243 }
      },
      {
        characterId: 2,
        mapId: 1,
        coords: { tlx: 932, tly: 240, brx: 943, bry: 254 }
      },
      {
        characterId: 3,
        mapId: 1,
        coords: { tlx: 821, tly: 221, brx: 831, bry: 228 }
      },
      {
        characterId: 4,
        mapId: 1,
        coords: { tlx: 327, tly: 208, brx: 341, bry: 227 }
      },
      {
        characterId: 5,
        mapId: 1,
        coords: { tlx: 134, tly: 208, brx: 145, bry: 229 }
      },


      {
        characterId: 1,
        mapId: 2,
        coords: { tlx: 489, tly: 379, brx: 503, bry: 398 }
      },
      {
        characterId: 2,
        mapId: 2,
        coords: { tlx: 358, tly: 316, brx: 369, bry: 333 }
      },
      {
        characterId: 3,
        mapId: 2,
        coords: { tlx: 709, tly: 551, brx: 722, bry: 558 }
      },
      {
        characterId: 4,
        mapId: 2,
        coords: { tlx: 940, tly: 351, brx: 955, bry: 368 }
      },
      {
        characterId: 5,
        mapId: 2,
        coords: { tlx: 89, tly: 419, brx: 103, bry: 436 }
      }
    ]
  });

  const leaderboard = await prisma.leaderboard.createManyAndReturn({
    data: [
      { username: "Jhon", time: 122, mapId: 1 },
      { username: "Armand", time: 80, mapId: 1 },
      { username: "The great", time: 75, mapId: 1 }
    ]
  });


  console.log('Default characters created:', characters);
  console.log('Default maps created:', maps);
  console.log('Default charactersOnMaps created:', characters);
  console.log('Default leaderboard created:', leaderboard);


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

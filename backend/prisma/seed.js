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
      { id: 2, name: "Moon Base" },
      { id: 3, name: "Snowy Mountains" },
      { id: 4, name: "Maze" }
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
        coords: { tlx: 709, tly: 551, brx: 723, bry: 558 }
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
      },


      {
        characterId: 1,
        mapId: 3,
        coords: { tlx: 1028, tly: 438, brx: 1044, bry: 462 }
      },
      {
        characterId: 2,
        mapId: 3,
        coords: { tlx: 592, tly: 254, brx: 603, bry: 273 }
      },
      {
        characterId: 3,
        mapId: 3,
        coords: { tlx: 361, tly: 438, brx: 373, bry: 444 }
      },
      {
        characterId: 4,
        mapId: 3,
        coords: { tlx: 86, tly: 458, brx: 102, bry: 473 }
      },
      {
        characterId: 5,
        mapId: 3,
        coords: { tlx: 385, tly: 387, brx: 398, bry: 401 }
      },


      {
        characterId: 1,
        mapId: 4,
        coords: { tlx: 681, tly: 260, brx: 692, bry: 272 }
      },
      {
        characterId: 2,
        mapId: 4,
        coords: { tlx: 922, tly: 324, brx: 934, bry: 334}
      },
      {
        characterId: 3,
        mapId: 4,
        coords: { tlx: 122, tly: 318, brx: 135, bry: 324 }
      },
      {
        characterId: 4,
        mapId: 4,
        coords: { tlx: 815, tly: 182, brx: 828, bry: 191 }
      },
      {
        characterId: 5,
        mapId: 4,
        coords: { tlx: 527, tly: 189, brx: 539, bry: 200 }
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

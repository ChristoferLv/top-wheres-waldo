import { prisma } from '../lib/prisma.js';
import 'dotenv/config';
import bcrypt from 'bcryptjs';


async function main() {
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
      { id: 1, name: "Beach" }
    ]
  });

  const charactersOnMaps = await prisma.character_on_map.createManyAndReturn({
    data: [
      {
        characterId: 1,
        mapId: 1,
        coords: { tlx: 498, tly: 222, brx: 511, bry: 243 }
      },
      {
        characterId: 2,
        mapId: 1,
        coords: { tlx: 624, tly: 240, brx: 633, bry: 253 }
      },
      {
        characterId: 3,
        mapId: 1,
        coords: { tlx: 550, tly: 221, brx: 558, bry: 228 }
      },
      {
        characterId: 4,
        mapId: 1,
        coords: { tlx: 220, tly: 206, brx: 233, bry: 225 }
      },
      {
        characterId: 5,
        mapId: 1,
        coords: { tlx: 92, tly: 208, brx: 102, bry: 229 }
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

# Where's Waldo (A Photo Tagging App)

A "Where's Waldo" style photo tagging app built as part of [The Odin Project Node.js](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app) course. It features an Express, PostgreSQL, and Prisma backend with a React and Vite frontend.

## Project Objective

The main goal was to practice:
- Building a full-stack application separating frontend from backend
- Coordinating frontend user interaction (clicking coordinates on an image) with backend validation
- Storing sensitive game data (character locations) securely on the server to prevent cheating
- Managing relational data to track game times and global leaderboards

## What is it?

A classic "Where's Waldo" interactive game where you can:
- Choose from different crowded images to play
- Search for specific hidden characters
- Click on the image to place a targeting box and select a character
- Get instant feedback on whether you found the character correctly
- Compete on the leaderboard based on how fast you can find all characters

## How to Use

The project is split into two separate apps.

### Backend

1. Open the backend folder:

```bash
cd NodeJS/top-wheres-waldo/backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure your environment variables using `.env.example` as a reference.
4. Apply the Prisma migration:

```bash
npx prisma migrate dev
```

5. Seed the database with the character coordinates and initial data:

```bash
npm run seed
```

6. Run the development server:

```bash
npm run dev
```

### Frontend

1. Open the frontend folder:

```bash
cd NodeJS/top-wheres-waldo/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the Vite development server:

```bash
npm run dev
```

4. Open the app in the browser using the local Vite address.

## Features

- **Character Validation**: coordinates are validated securely on the backend
- **Game Timer**: tracks how long it takes to find all characters
- **Leaderboards**: records and displays the fastest times for each picture
- **Responsive UI**: targeting box adjusts and works seamlessly across different screen sizes
- **RESTful API**: dedicated endpoints for game sessions, validation, and leaderboards

## Project Structure

- `backend/`: Express API, routes, controllers, and PostgreSQL database management with Prisma
- `frontend/`: React/Vite application, game interface, and state management

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Prisma
- React
- Vite
- React Router

## Visualization

<img width="1910" height="915" alt="where is waldo screenshot" src="https://github.com/user-attachments/assets/c253c716-2b84-4a6c-9974-e1cfd974fe06" />

---

Project developed following: [The Odin Project - Where's Waldo (A Photo Tagging App)](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app)

📍 **Main repository with all projects**: [ChristoferLv/TheOdinProject](https://github.com/ChristoferLv/TheOdinProject)

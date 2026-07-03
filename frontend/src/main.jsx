import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import App from './App.jsx'
import HomePage from './Home.jsx';
import BoardPage from './BoardPage.jsx';
import LeaderboardPage from './LeaderboardPage.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/leaderboard",
        element: <LeaderboardPage />,
      },
      {
        path: "/map/:mapId",
        element: <BoardPage />,
      },
      
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

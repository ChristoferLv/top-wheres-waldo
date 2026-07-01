import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import App from './BoardPage.jsx'
import HomePage from './Home.jsx';
import BoardPage from './BoardPage.jsx';



const router = createBrowserRouter([
  {
    path: "/map/:id",
    element: <BoardPage />,
  },
  {
    path:"/",
    element:<HomePage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

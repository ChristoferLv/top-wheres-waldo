import { createContext, useContext, useState } from 'react'
import "./App.css"
import { Outlet, useNavigate } from 'react-router'
import { Link } from "react-router";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <Link to={"/"}>Where's Waldo</Link>
      </header>
      <Outlet />
    </>
  )
}

export default App

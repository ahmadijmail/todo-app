import React from "react";
import Login from "./components/auth/login.js";

import ToDo from "./components/todo/todo.js";
import { Settings } from "./conText/settings.js";
import LoginProvider from "./components/auth/context"
import NavBar from "./components/navBar/navBar"
export default function App() {
  return (

    <Settings>
      <LoginProvider>
      <Login/>

      <ToDo />
      </LoginProvider>
    </Settings>

  );
}

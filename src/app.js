import React from "react";
import Login from "./components/auth/login.js";

import ToDo from "./components/todo/todo.js";
import { Settings } from "./conText/settings.js";
import LoginProvider from "./components/auth/context"
//import Login from "./components/auth/auth"
export default function App() {
  return (

    
    <Settings>
      <LoginProvider>
      <Login/>
      </LoginProvider>
      <ToDo />
    </Settings>
  );
}

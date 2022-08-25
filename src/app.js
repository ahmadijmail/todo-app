import React from "react";

import ToDo from "./components/todo/todo.js";
import { Settings } from "./conText/settings.js";

export default function App() {
  return (
    <Settings>
      <ToDo />
    </Settings>
  );
}

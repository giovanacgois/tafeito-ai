import React, {ReactNode} from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./screens/Login";

function App(props:{children:ReactNode}) {
  return <div className="App">{props.children}</div>;
}

export default App;

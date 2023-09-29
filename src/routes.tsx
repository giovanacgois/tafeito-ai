import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./screens/Login";
import App from "./App";
import Tasks from "./screens/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Login></Login>
      </App>
    ),
  },
  {
    path: "tasks",
    element: (
      <App>
        <Tasks></Tasks>
      </App>
    ),
  },
]);

export { router };

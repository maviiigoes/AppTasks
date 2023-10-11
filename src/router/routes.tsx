import { createBrowserRouter } from "react-router-dom";
import { TaskPage } from "../pages/TaskPage";
import { HomePage } from "../pages/HomePages";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFound";
import { App } from "../App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "tasks",
        element: <TaskPage />,
      },
    
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
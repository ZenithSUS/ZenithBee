import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts";
import NotFound from "./pages/not-found";
import Orders from "./pages/orders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      {
        path: "/orders",
        Component: Orders,
      },
    ],
  },
]);

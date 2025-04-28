import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts";
import NotFound from "./pages/not-found";
import Loading from "./components/loading";
const Orders = lazy(() => import("./pages/orders"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      {
        path: "/orders",
        element: (
          <Suspense fallback={<Loading />}>
            <Orders />
          </Suspense>
        ),
      },
    ],
  },
]);

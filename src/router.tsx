import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts";
import NotFound from "./pages/not-found";
import Loading from "./components/loading";
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Home = lazy(() => import("./pages/home"));
const Orders = lazy(() => import("./pages/orders"));
const Favorites = lazy(() => import("./pages/favorites"));
const Reserved = lazy(() => import("./pages/reserved"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<Loading />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: "/favorites",
        element: (
          <Suspense fallback={<Loading />}>
            <Favorites />
          </Suspense>
        ),
      },
      {
        path: "/reserved",
        element: (
          <Suspense fallback={<Loading />}>
            <Reserved />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    Component: Register,
    errorElement: <NotFound />,
  },
]);

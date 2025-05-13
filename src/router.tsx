import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts";
import NotFound from "./pages/route-status/not-found";
import Error from "./pages/route-status/error";
import Loading from "./components/loading";

const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const Home = lazy(() => import("./pages/navigation/home"));
const Products = lazy(() => import("./pages/navigation/products"));
const Favorites = lazy(() => import("./pages/navigation/favorites"));
const Orders = lazy(() => import("./pages/navigation/orders"));
const Reserved = lazy(() => import("./pages/navigation/reserved"));
const Account = lazy(() => import("./pages/navigation/account"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error />,
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
        path: "/products",
        element: (
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/products/:filter",
        element: (
          <Suspense fallback={<Loading />}>
            <Products />
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
        path: "/orders",
        element: (
          <Suspense fallback={<Loading />}>
            <Orders />
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
      {
        path: "/account",
        element: (
          <Suspense fallback={<Loading />}>
            <Account />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
    errorElement: <Error />,
  },
  {
    path: "/register",
    Component: Register,
    errorElement: <Error />,
  },
  {
    path: "*",
    Component: NotFound,
    errorElement: <Error />,
  },
]);

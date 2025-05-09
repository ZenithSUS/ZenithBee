import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/theme.tsx";
import { OrderProvider } from "./context/order.tsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router.tsx";
import "./index.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <OrderProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </OrderProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);

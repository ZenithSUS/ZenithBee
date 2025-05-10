import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Loading from "../components/loading";
import fetchAuthUser from "../lib/services/get-auth";
import { account } from "../appwrite";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MainLayout() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      let userSession = JSON.parse(localStorage.getItem("session") || "false");

      if (userSession) {
        const authResult = await fetchAuthUser(userSession);
        setIsAuthenticated(!!authResult);
      } else {
        try {
          const session = await account.getSession("current");
          if (session && session.current) {
            userSession = session.current;
            localStorage.setItem("session", JSON.stringify(userSession));
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Session error:", error);
          setIsAuthenticated(false);
        }
      }

      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (authChecked && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!authChecked) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-auto px-2 lg:ml-[110px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

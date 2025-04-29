import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto px-4 md:ml-[110px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

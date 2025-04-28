import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
      </div>
      <main className="ml-[120px] flex-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

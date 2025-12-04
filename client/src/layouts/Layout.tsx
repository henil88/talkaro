import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="w-full h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;

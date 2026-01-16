import { memo, type FC } from "react";
import { Outlet } from "react-router";
import Navbar from "@/components/Navbar";

const Layout: FC = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-zinc-950 px-4 text-zinc-50 md:px-12">
      <header>
        <Navbar />
      </header>
      <main className="flex min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default memo(Layout);

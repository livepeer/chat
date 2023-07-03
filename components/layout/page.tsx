import React from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#1D1F2D] h-screen flex flex-row ">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </main>
  );
}

import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-24 border-[#292B38] border-r flex pt-6 flex-col justify-between items-center">
      <Link href={"/"} className="w-[45px]">
        <img
          src="/livepeer.png"
          className="rounded-xl shadow-lg shadow-white/30"
        />
      </Link>
    </div>
  );
}

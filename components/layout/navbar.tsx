import { useCreateStream } from "@livepeer/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  return (
    <header className="border-[#292B38] border-b ">
      <nav className="flex px-8 items-center justify-between h-16">
        <Link
          href={"/"}
          className="font-satoshi-medium text-white text-xl cursor-pointer"
        >
          Livepeer Chat
        </Link>
      </nav>
    </header>
  );
}

import React from "react";
import Search from "../Search/Search";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-green-500 p-2 w-full">
      <div className="mx-auto max-w-7xl flex items-center flex-col sm:flex-row sm:justify-between">
        <Link href="/">
          <h1 className="font-bold text-2xl text-white">Pokemon App</h1>
        </Link>
        <Search />
      </div>
    </div>
  );
}

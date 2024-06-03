import React from "react";
import Search from "./Search";

export default function Header() {
  return (
    <div className="bg-green-500 p-2 w-full">
      <div className="mx-auto max-w-7xl flex items-center flex-col sm:flex-row sm:justify-between">
        <h1 className="text-bold text-2xl text-gray-50">Pokemon App</h1>
        <Search />
      </div>
    </div>
  );
}

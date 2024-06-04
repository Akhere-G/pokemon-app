"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <input
      className="rounded p-1"
      placeholder="Enter pokemon name"
      onChange={(e) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        const value = e.target.value.trim();

        if (!value) {
          current.delete("search");
        } else {
          current.set("search", e.target.value);
        }

        const search = current.toString();
        const query = search ? `?${search}` : "";

        router.push(`/${query}`);
      }}
    />
  );
}

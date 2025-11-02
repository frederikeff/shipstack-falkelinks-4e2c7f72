"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface LabGridItemProps {
  href: string;
  title: string;
}

export default function LabGridItem({ href, title }: LabGridItemProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading for 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      href={href}
      className={`flex h-32 w-32 items-center justify-center rounded-lg bg-pink-500 p-4 text-center font-bold text-white shadow-lg transition-transform hover:scale-105 ${
        loading ? "animate-pulse" : ""
      }`}
    >
      {loading ? "" : title}
    </Link>
  );
}
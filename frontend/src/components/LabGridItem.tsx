"use client";

import Link from "next/link";

interface LabGridItemProps {
  href: string;
  title: string;
}

export default function LabGridItem({ href, title }: LabGridItemProps) {
  const handleClick = async () => {
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "labGridItemClick",
          title,
          href,
        }),
      });
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="flex h-32 w-32 items-center justify-center rounded-lg bg-pink-500 p-4 text-center font-bold text-white shadow-lg transition-transform hover:scale-105"
    >
      {title}
    </Link>
  );
}
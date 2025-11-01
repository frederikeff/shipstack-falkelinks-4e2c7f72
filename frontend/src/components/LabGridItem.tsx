'use client'

import Link from "next/link";
import { event } from "@/lib/gtag";

interface LabGridItemProps {
  href: string;
  title: string;
}

export default function LabGridItem({ href, title }: LabGridItemProps) {
  const handleClick = () => {
    event({
      action: "click",
      category: "Lab Link",
      label: title,
      value: 1,
    });
  };

  return (
    <Link
      href={href}
      className="flex h-32 w-32 items-center justify-center rounded-lg bg-pink-500 p-4 text-center font-bold text-white shadow-lg transition-transform hover:scale-105"
      onClick={handleClick}
    >
      {title}
    </Link>
  );
}
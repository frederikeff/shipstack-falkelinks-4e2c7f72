"use client";
import Link from "next/link";
import { trackClick } from "@/utils/analytics";

interface LabGridItemProps {
  href: string;
  title: string;
}

export default function LabGridItem({ href, title }: LabGridItemProps) {
  return (
    <Link
      href={href}
      onClick={() => trackClick(href)}
      className="flex h-32 w-32 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 p-4 text-center font-bold text-white shadow-xl transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
    >
      {title}
    </Link>
  );
}
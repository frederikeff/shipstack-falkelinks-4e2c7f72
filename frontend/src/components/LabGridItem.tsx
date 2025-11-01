"use client";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface LabGridItemProps {
  href: string;
  title: string;
}

export default function LabGridItem({ href, title }: LabGridItemProps) {
  return (
    <Link
      href={href}
      className="flex h-32 w-32 items-center justify-center rounded-lg bg-pink-500 p-4 text-center font-bold text-white shadow-lg transition-transform hover:scale-105"
      onClick={() => trackEvent('Lab Grid Item Click', { href, title })}
    >
      {title}
    </Link>
  );
}
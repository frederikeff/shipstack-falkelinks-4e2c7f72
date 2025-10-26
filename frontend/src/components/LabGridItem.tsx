import Link from "next/link";

interface LabGridItemProps {
  href: string;
  title: string;
  color: string;
}

export default function LabGridItem({ href, title, color }: LabGridItemProps) {
  return (
    <Link
      href={href}
      className={`flex h-32 w-32 items-center justify-center rounded-lg p-4 text-center font-bold text-white shadow-lg transition-transform hover:scale-105 ${color}`}
    >
      {title}
    </Link>
  );
}
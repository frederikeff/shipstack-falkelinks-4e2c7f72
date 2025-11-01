import Link from "next/link";

interface LabGridItemProps {
  href: string;
  title: string;
}

export default function LabGridItem({ href, title }: LabGridItemProps) {
  return (
    <Link
      href={href}
      className="flex h-32 w-32 items-center justify-center rounded-lg bg-yellow-400 p-4 text-center font-bold text-purple-900 shadow-lg transition-transform hover:scale-105 hover:bg-yellow-500 border-2 border-purple-600"
    >
      {title}
    </Link>
  );
}
'use client';

import Image from "next/image";
import { trackClick } from "@/utils/track";

interface ProjectLinkProps {
  href: string;
  title: string;
  imageSrc: string;
}

export default function ProjectLink({ href, title, imageSrc }: ProjectLinkProps) {
  const handleClick = () => {
    trackClick(href, title);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="m-4 flex w-full max-w-2xl items-center rounded-lg bg-white p-4 shadow-lg transition-transform hover:scale-105"
      style={{ color: '#4c2a85' }}
      onClick={handleClick}
    >
      <Image
        src={imageSrc}
        alt={`${title} logo`}
        width={80}
        height={80}
        className="rounded-lg"
      />
      <h2 className="ml-4 text-xl font-semibold">{title}</h2>
    </a>
  );
}
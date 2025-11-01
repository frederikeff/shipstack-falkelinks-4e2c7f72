'use client';

import Image from 'next/image';

type ProjectLinkProps = {
  href: string;
  title: string;
  imageSrc: string;
};

const trackClick = (href: string) => {
  fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ href }),
  });
};

export default function ProjectLink({
  href,
  title,
  imageSrc,
}: ProjectLinkProps) {
  const handleClick = () => {
    trackClick(href);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-4 flex w-full max-w-2xl items-center rounded-lg bg-purple-600 p-4 text-white shadow-lg transition-transform hover:scale-105"
      onClick={handleClick}
    >
      <Image
        src={imageSrc}
        alt={`${title} logo`}
        width={50}
        height={50}
        className="mr-4 rounded-md"
      />
      <span className="font-bold">{title}</span>
    </a>
  );
}

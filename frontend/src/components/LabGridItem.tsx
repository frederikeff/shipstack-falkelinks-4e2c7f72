'use client';

type LabGridItemProps = {
  href: string;
  title: string;
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

export default function LabGridItem({ href, title }: LabGridItemProps) {
  const handleClick = () => {
    trackClick(href);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-pink-500 p-4 text-center font-bold text-white shadow-lg transition-transform hover:scale-105"
      onClick={handleClick}
    >
      {title}
    </a>
  );
}

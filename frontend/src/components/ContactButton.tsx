'use client';
import * as gtag from '@/lib/gtag';

interface ContactButtonProps {
  href: string;
}

export default function ContactButton({ href }: ContactButtonProps) {
  const handleClick = () => {
    gtag.event({
      action: 'click',
      category: 'Contact Button',
      label: href,
      value: 0,
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="rounded-full bg-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105"
    >
      Email Me
    </a>
  );
}

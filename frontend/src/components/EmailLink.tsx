'use client';

interface EmailLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function EmailLink({ href, children }: EmailLinkProps) {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: href }),
      });
    } catch (error) {
      console.error('Failed to track click', error);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="rounded-full bg-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105"
    >
      {children}
    </a>
  );
}

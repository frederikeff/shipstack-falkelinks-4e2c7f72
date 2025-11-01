'use client'

import { event } from '@/lib/gtag'

export default function ContactButton() {
  const handleClick = () => {
    event({
      action: 'click',
      category: 'Contact',
      label: 'Email',
    })
  }

  return (
    <a
      href="mailto:hi@creativeailab.ai"
      onClick={handleClick}
      className="rounded-full bg-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105"
    >
      Email Me
    </a>
  )
}

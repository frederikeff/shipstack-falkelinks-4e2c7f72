'use client'

import * as gtag from "@/lib/gtag";

export default function ContactButton() {
  return (
    <a
      href="mailto:hi@creativeailab.ai"
      className="rounded-full bg-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105"
      onClick={() => {
        gtag.event({
          action: "click",
          category: "Contact",
          label: "Email",
          value: 0,
        });
      }}
    >
      Email Me
    </a>
  );
}

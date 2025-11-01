'use client';

import Image from "next/image";
import ProjectLink from "@/components/ProjectLink";
import LabGridItem from "@/components/LabGridItem";
import { trackEvent } from "@/lib/analytics";

export default function Home() {
  const projects = [
    {
      href: "https://www.nxtconnect.ai",
      title: "Nxtconnect",
      imageSrc: "https://ui-avatars.com/api/?name=NxtConnect&size=400&background=6366f1&color=fff&bold=true",
    },
    {
      href: "https://www.creativeailab.ai",
      title: "Creative Ai Lab",
      imageSrc: "https://ui-avatars.com/api/?name=Creative+AI+Lab&size=400&background=6366f1&color=fff&bold=true",
    },
    {
      href: "https://www.shaped.ai",
      title: "Shaped.ai",
      imageSrc: "https://ui-avatars.com/api/?name=Shaped&size=400&background=ec4899&color=fff&bold=true",
    },
  ];

  const labs = [
    { href: "https://www.creativeailab.ai/builder-lab", title: "Builder Lab" },
    { href: "https://www.creativeailab.ai/character-lab", title: "Character Lab" },
    { href: "https://www.creativeailab.ai/research-lab", title: "Research Lab" },
    { href: "https://www.creativeailab.ai/mind-lab", title: "Mind Lab" },
    { href: "https://www.creativeailab.ai/creator-lab", title: "Creator Lab" },
  ];

  const handleEmailClick = () => {
    trackEvent('Contact Button Click', { email: 'hi@creativeailab.ai' });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col items-center">
        <Image
          src="https://assets.skool.com/f/997b615b8b8a4757949f52b71fd75241/0813149b55df480ca4da022e17c579d285942e9fe1ce44f6b2a80873d59235e0-md.jpg"
          alt="Frederike Falke profile picture"
          width={150}
          height={150}
          className="rounded-full"
        />
        <h1 className="mt-4 text-2xl font-bold">Frederike Falke</h1>
      </div>
      <div className="mt-8 flex w-full flex-col items-center">
        {projects.map((project) => (
          <ProjectLink key={project.title} {...project} />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {labs.map((lab) => (
          <LabGridItem key={lab.title} {...lab} />
        ))}
      </div>
      <div className="mt-8">
        <a
          href="mailto:hi@creativeailab.ai"
          onClick={handleEmailClick}
          className="rounded-full bg-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105"
        >
          Email Me
        </a>
      </div>
    </main>
  );
}
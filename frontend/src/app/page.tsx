import Image from "next/image";
import ProjectLink from "@/components/ProjectLink";
import LabGridItem from "@/components/LabGridItem";
import { projects } from "@/data/projects";
import { labs } from "@/data/labs";

export default function Home() {
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
          className="rounded-full bg-brand-purple px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105"
        >
          Email Me
        </a>
      </div>
    </main>
  );
}
import LabGridItem from "@/components/LabGridItem";

const labs = [
  { href: "https://www.creativeailab.ai/builder-lab", title: "Builder Lab" },
  { href: "https://www.creativeailab.ai/character-lab", title: "Character Lab" },
  { href: "https://www.creativeailab.ai/research-lab", title: "Research Lab" },
  { href: "https://www.creativeailab.ai/mind-lab", title: "Mind Lab" },
  { href: "https://www.creativeailab.ai/creator-lab", title: "Creator Lab" },
];

export default function LabGrid() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
      {labs.map((lab) => (
        <LabGridItem key={lab.title} {...lab} />
      ))}
    </div>
  );
}

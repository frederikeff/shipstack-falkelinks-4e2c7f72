import LabGridItem from "./LabGridItem";
import { labs } from "@/data/labs";

export default function LabGrid() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
      {labs.map((lab) => (
        <LabGridItem key={lab.title} {...lab} />
      ))}
    </div>
  );
}
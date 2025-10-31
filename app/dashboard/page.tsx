import SectionCard from "@/components/section-card";
import AlertWelcome from "@/components/alert-welcome";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <AlertWelcome />
      <SectionCard />
    </div>
  );
}

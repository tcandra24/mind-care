import SectionCard from "@/components/section-card";
import AlertWelcome from "@/components/alert-welcome";
import ChartArea from "@/components/chart-area";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <AlertWelcome />
      <SectionCard />
      <ChartArea />
    </div>
  );
}

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressBar = ({ currentStep, totalSteps = 7 }: ProgressBarProps) => {
  return (
    <div className="bg-background px-6 py-3">
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              index < currentStep ? "bg-accent" : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

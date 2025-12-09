import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";

interface WeeklyFrequencyProps {
  onBack: () => void;
  onContinue: (selection: string) => void;
}

const frequencyOptions = [
  {
    id: "four-days",
    title: "4 Days",
    description: "Monday through Thursday",
    activeDays: [0, 1, 2, 3],
  },
  {
    id: "weekdays",
    title: "Weekdays",
    description: "Monday through Friday",
    activeDays: [0, 1, 2, 3, 4],
  },
  {
    id: "every-day",
    title: "Every Day",
    description: "Full week coverage",
    activeDays: [0, 1, 2, 3, 4, 5, 6],
  },
];

const allDays = ["M", "T", "W", "T", "F", "S", "S"];

const WeeklyFrequency = ({ onBack, onContinue }: WeeklyFrequencyProps) => {
  const [selected, setSelected] = useState<string>("weekdays");

  const handleContinue = () => {
    onContinue(selected);
  };

  const getActiveDaysForOption = (optionId: string) => {
    const option = frequencyOptions.find(o => o.id === optionId);
    return option?.activeDays || [];
  };

  return (
    <div className="h-dvh flex flex-col bg-secondary overflow-hidden">
      {/* Header */}
      <header className="bg-background py-3 px-4 flex items-center border-b border-border shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold tracking-[0.1em] text-foreground font-sans pr-10">
          MACROPLATE
        </h1>
      </header>

      {/* Progress indicator */}
      <ProgressBar currentStep={7} totalSteps={11} />

      {/* Content */}
      <div className="flex-1 px-4 py-4 min-h-0 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-2xl text-secondary-foreground text-center mb-1">
            How many days per week?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-4">
            Select your weekly delivery schedule
          </p>
        </div>

        <div className="space-y-3 max-w-md mx-auto">
          {frequencyOptions.map((option) => {
            const isSelected = selected === option.id;
            const activeDays = getActiveDaysForOption(option.id);
            
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={cn(
                  "w-full p-4 rounded-lg transition-all duration-200 text-left",
                  isSelected
                    ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-secondary"
                    : "bg-background text-foreground hover:bg-background/90"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className={cn(
                      "text-lg font-semibold",
                      isSelected ? "text-accent-foreground" : "text-foreground"
                    )}>
                      {option.title}
                    </h3>
                    <p className={cn(
                      "text-xs",
                      isSelected ? "text-accent-foreground/80" : "text-muted-foreground"
                    )}>
                      {option.description}
                    </p>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected
                      ? "border-accent-foreground bg-accent-foreground"
                      : "border-muted-foreground/30"
                  )}>
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </div>
                </div>

                <div className={cn(
                  "flex items-center justify-center gap-1.5 py-2 rounded-lg",
                  isSelected ? "bg-accent-foreground/10" : "bg-muted/50"
                )}>
                  {allDays.map((day, index) => {
                    const isActive = activeDays.includes(index);
                    return (
                      <div
                        key={index}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground/40"
                        )}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-secondary shrink-0">
        <Button
          onClick={handleContinue}
          className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default WeeklyFrequency;

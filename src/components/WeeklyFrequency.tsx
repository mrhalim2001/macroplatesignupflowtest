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
    id: "three-days",
    title: "3 Days",
    description: "Perfect for trying it out",
    days: ["M", "W", "F"],
    activeDays: [0, 2, 4], // Mon, Wed, Fri
  },
  {
    id: "weekdays",
    title: "Weekdays",
    description: "Monday through Friday",
    days: ["M", "T", "W", "T", "F"],
    activeDays: [0, 1, 2, 3, 4], // Mon-Fri
  },
  {
    id: "every-day",
    title: "Every Day",
    description: "Full week coverage",
    days: ["M", "T", "W", "T", "F", "S", "S"],
    activeDays: [0, 1, 2, 3, 4, 5, 6], // All days
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
    <div className="min-h-screen flex flex-col bg-secondary">
      {/* Header */}
      <header className="bg-background py-4 px-4 flex items-center border-b border-border">
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
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-3xl text-secondary-foreground text-center mb-2">
            How many days per week?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-8">
            Select your weekly delivery schedule
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {frequencyOptions.map((option) => {
            const isSelected = selected === option.id;
            const activeDays = getActiveDaysForOption(option.id);
            
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={cn(
                  "w-full p-6 rounded-lg transition-all duration-200 text-left",
                  isSelected
                    ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-secondary"
                    : "bg-background text-foreground hover:bg-background/90"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={cn(
                      "text-xl font-semibold",
                      isSelected ? "text-accent-foreground" : "text-foreground"
                    )}>
                      {option.title}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isSelected ? "text-accent-foreground/80" : "text-muted-foreground"
                    )}>
                      {option.description}
                    </p>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected
                      ? "border-accent-foreground bg-accent-foreground"
                      : "border-muted-foreground/30"
                  )}>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    )}
                  </div>
                </div>

                <div className={cn(
                  "flex items-center justify-center gap-2 py-3 rounded-xl",
                  isSelected ? "bg-accent-foreground/10" : "bg-muted/50"
                )}>
                  {allDays.map((day, index) => {
                    const isActive = activeDays.includes(index);
                    return (
                      <div
                        key={index}
                        className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
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
      <div className="p-6 bg-secondary">
        <Button
          onClick={handleContinue}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default WeeklyFrequency;

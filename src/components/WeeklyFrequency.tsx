import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-4 mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: "86%" }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Step 6 of 7</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          How many days per week?
        </h1>
        <p className="text-muted-foreground mb-8">
          Select your weekly delivery schedule
        </p>

        <div className="space-y-4">
          {frequencyOptions.map((option) => {
            const isSelected = selected === option.id;
            const activeDays = getActiveDaysForOption(option.id);
            
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={cn(
                  "w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={cn(
                      "text-xl font-semibold",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {option.description}
                    </p>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  )}>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                </div>

                {/* Calendar days visualization */}
                <div className="flex items-center justify-center gap-2 py-3 bg-muted/50 rounded-xl">
                  {allDays.map((day, index) => {
                    const isActive = activeDays.includes(index);
                    return (
                      <div
                        key={index}
                        className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground"
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

      {/* Bottom button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleContinue}
          className="w-full py-6 text-lg font-semibold"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default WeeklyFrequency;

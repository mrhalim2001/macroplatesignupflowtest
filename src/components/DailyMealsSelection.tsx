import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun, Coffee, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";

interface DailyMealsSelectionProps {
  onBack: () => void;
  onContinue: (selection: string) => void;
}

const mealOptions = [
  {
    id: "lunch",
    title: "Just Lunch",
    description: "1 meal per day",
    meals: ["lunch"],
  },
  {
    id: "lunch-dinner",
    title: "Lunch & Dinner",
    description: "2 meals per day",
    meals: ["lunch", "dinner"],
  },
  {
    id: "all-meals",
    title: "All Three Meals",
    description: "3 meals per day",
    meals: ["breakfast", "lunch", "dinner"],
  },
];

const MealIcon = ({ type, active }: { type: string; active: boolean }) => {
  const iconClass = cn(
    "w-6 h-6 transition-all duration-200",
    active ? "text-accent" : "text-muted-foreground/30"
  );

  switch (type) {
    case "breakfast":
      return <Coffee className={iconClass} />;
    case "lunch":
      return <Sun className={iconClass} />;
    case "dinner":
      return <Moon className={iconClass} />;
    default:
      return null;
  }
};

const DailyMealsSelection = ({ onBack, onContinue }: DailyMealsSelectionProps) => {
  const [selected, setSelected] = useState<string>("lunch-dinner");

  const handleContinue = () => {
    onContinue(selected);
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
      <ProgressBar currentStep={6} totalSteps={11} />

      {/* Content */}
      <div className="flex-1 px-4 py-4 min-h-0 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-2xl text-secondary-foreground text-center mb-1">
            How many meals per day?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-4">
            Choose how many daily meals you'd like
          </p>
        </div>

        <div className="space-y-3 max-w-md mx-auto">
          {mealOptions.map((option) => {
            const isSelected = selected === option.id;
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
                  "flex items-center gap-4 justify-center py-2 rounded-lg",
                  isSelected ? "bg-accent-foreground/10" : "bg-muted/50"
                )}>
                  <div className="flex flex-col items-center gap-0.5">
                    <MealIcon type="breakfast" active={option.meals.includes("breakfast")} />
                    <span className={cn(
                      "text-[10px] font-medium",
                      option.meals.includes("breakfast") ? "text-accent" : "text-muted-foreground/30"
                    )}>
                      Breakfast
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <MealIcon type="lunch" active={option.meals.includes("lunch")} />
                    <span className={cn(
                      "text-[10px] font-medium",
                      option.meals.includes("lunch") ? "text-accent" : "text-muted-foreground/30"
                    )}>
                      Lunch
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <MealIcon type="dinner" active={option.meals.includes("dinner")} />
                    <span className={cn(
                      "text-[10px] font-medium",
                      option.meals.includes("dinner") ? "text-accent" : "text-muted-foreground/30"
                    )}>
                      Dinner
                    </span>
                  </div>
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

export default DailyMealsSelection;

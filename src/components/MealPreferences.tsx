import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Check, 
  Utensils, 
  Flame, 
  Beef, 
  Wheat, 
  Pill, 
  Salad, 
  Leaf,
  Target
} from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

const mealTypes = [
  { id: "everything", label: "I eat everything", icon: Utensils, isDefault: true },
  { id: "calorie-smart", label: "Calorie smart", icon: Target },
  { id: "keto", label: "Keto", icon: Flame },
  { id: "high-protein", label: "High protein", icon: Beef },
  { id: "low-carb", label: "Low carb", icon: Wheat },
  { id: "glp1", label: "GLP-1 support", icon: Pill },
  { id: "fiber", label: "Fiber filled", icon: Salad },
  { id: "plant-based", label: "Plant based", icon: Leaf },
];

interface MealPreferencesProps {
  onBack: () => void;
  onContinue: (selectedMeals: string[]) => void;
}

const MealPreferences = ({ onBack, onContinue }: MealPreferencesProps) => {
  const [selectedMeals, setSelectedMeals] = useState<string[]>(["everything"]);

  const toggleMeal = (mealId: string) => {
    setSelectedMeals((prev) => {
      // If clicking "I eat everything"
      if (mealId === "everything") {
        return ["everything"];
      }

      // If clicking a specific meal type
      const withoutEverything = prev.filter((id) => id !== "everything");
      
      if (prev.includes(mealId)) {
        // Deselecting this meal
        const newSelection = withoutEverything.filter((id) => id !== mealId);
        // If nothing left selected, default back to "everything"
        return newSelection.length === 0 ? ["everything"] : newSelection;
      } else {
        // Selecting this meal - remove "everything" and add new selection
        return [...withoutEverything, mealId];
      }
    });
  };

  const isSelected = (mealId: string) => selectedMeals.includes(mealId);

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
      <ProgressBar currentStep={3} />

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-3xl text-secondary-foreground text-center mb-2">
            What meals do you prefer?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-8">
            Select all that apply
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {mealTypes.map((meal, index) => {
            const Icon = meal.icon;
            const selected = isSelected(meal.id);
            
            return (
              <button
                key={meal.id}
                onClick={() => toggleMeal(meal.id)}
                className={`
                  relative p-5 rounded-lg flex flex-col items-center gap-3 transition-all duration-200
                  animate-fade-in
                  ${selected 
                    ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-secondary" 
                    : "bg-background text-foreground hover:bg-background/90"
                  }
                `}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                {selected && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <Icon className={`w-7 h-7 ${selected ? "text-accent-foreground" : "text-accent"}`} />
                <span className="text-sm font-medium text-center leading-tight">
                  {meal.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-secondary">
        <Button
          onClick={() => onContinue(selectedMeals)}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MealPreferences;

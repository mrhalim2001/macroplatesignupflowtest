import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Scale, Dumbbell, Leaf, Clock, Zap, ArrowLeft, Check } from "lucide-react";

const goals = [
  { id: "health", label: "Improve my health", icon: Heart },
  { id: "weight", label: "Lose weight", icon: Scale },
  { id: "muscle", label: "Build muscle", icon: Dumbbell },
  { id: "clean", label: "Eat cleaner", icon: Leaf },
  { id: "time", label: "Save time", icon: Clock },
  { id: "energy", label: "Boost energy", icon: Zap },
];

interface GoalsSelectionProps {
  onBack: () => void;
  onContinue: (selectedGoals: string[]) => void;
}

const GoalsSelection = ({ onBack, onContinue }: GoalsSelectionProps) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, goalId];
    });
  };

  const isSelected = (goalId: string) => selectedGoals.includes(goalId);

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
      <div className="bg-background px-6 py-3">
        <div className="flex gap-2">
          <div className="h-1 flex-1 bg-accent rounded-full" />
          <div className="h-1 flex-1 bg-accent rounded-full" />
          <div className="h-1 flex-1 bg-border rounded-full" />
          <div className="h-1 flex-1 bg-border rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-3xl text-secondary-foreground text-center mb-2">
            What are your goals?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-8">
            Select up to 3 goals
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            const selected = isSelected(goal.id);
            
            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
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
                  {goal.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-secondary">
        <Button
          onClick={() => onContinue(selectedGoals)}
          disabled={selectedGoals.length === 0}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default GoalsSelection;

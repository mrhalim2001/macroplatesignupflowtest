import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  X,
  Shell,
  Nut,
  Bean,
  Wheat,
  Milk,
  Egg,
  Fish,
  Sprout
} from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

const allergies = [
  { id: "shellfish", label: "Shellfish", icon: Shell },
  { id: "nuts", label: "Tree nuts", icon: Nut },
  { id: "peanuts", label: "Peanuts", icon: Bean },
  { id: "wheat", label: "Wheat", icon: Wheat },
  { id: "dairy", label: "Dairy", icon: Milk },
  { id: "eggs", label: "Eggs", icon: Egg },
  { id: "fish", label: "Fish", icon: Fish },
  { id: "soy", label: "Soy", icon: Sprout },
];

interface AllergiesSelectionProps {
  onBack: () => void;
  onContinue: (selectedAllergies: string[]) => void;
}

const AllergiesSelection = ({ onBack, onContinue }: AllergiesSelectionProps) => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies((prev) => {
      if (prev.includes(allergyId)) {
        return prev.filter((id) => id !== allergyId);
      }
      return [...prev, allergyId];
    });
  };

  const isSelected = (allergyId: string) => selectedAllergies.includes(allergyId);

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
      <ProgressBar currentStep={4} totalSteps={12} />

      {/* Content */}
      <div className="flex-1 px-4 py-4 min-h-0 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-2xl text-secondary-foreground text-center mb-1">
            Any food allergies?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-4">
            Tap to exclude from your meals
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          {allergies.map((allergy, index) => {
            const Icon = allergy.icon;
            const selected = isSelected(allergy.id);
            
            return (
              <button
                key={allergy.id}
                onClick={() => toggleAllergy(allergy.id)}
                className={`
                  relative p-4 rounded-lg flex flex-col items-center gap-2 transition-all duration-200
                  animate-fade-in
                  ${selected 
                    ? "bg-destructive/10 text-destructive ring-2 ring-destructive ring-offset-2 ring-offset-secondary" 
                    : "bg-background text-foreground hover:bg-background/90"
                  }
                `}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                {selected && (
                  <div className="absolute top-2 right-2">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                )}
                <div className="relative">
                  <Icon className={`w-6 h-6 ${selected ? "text-destructive/70" : "text-accent"}`} />
                  {selected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-0.5 bg-destructive rotate-45 rounded-full" />
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium text-center leading-tight ${selected ? "opacity-70" : ""}`}>
                  {selected ? `No ${allergy.label}` : allergy.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-secondary shrink-0">
        <Button
          onClick={() => onContinue(selectedAllergies)}
          className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm"
        >
          {selectedAllergies.length === 0 ? "No Allergies" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default AllergiesSelection;

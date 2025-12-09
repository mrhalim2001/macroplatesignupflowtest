import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Check, 
  Shell,
  Nut,
  Bean,
  Wheat,
  Milk,
  Egg,
  Fish,
  Cherry
} from "lucide-react";

const allergies = [
  { id: "shellfish", label: "Shellfish", icon: Shell },
  { id: "nuts", label: "Tree nuts", icon: Nut },
  { id: "peanuts", label: "Peanuts", icon: Bean },
  { id: "wheat", label: "Wheat", icon: Wheat },
  { id: "dairy", label: "Dairy", icon: Milk },
  { id: "eggs", label: "Eggs", icon: Egg },
  { id: "fish", label: "Fish", icon: Fish },
  { id: "soy", label: "Soy", icon: Cherry },
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
          <div className="h-1 flex-1 bg-accent rounded-full" />
          <div className="h-1 flex-1 bg-accent rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-3xl text-secondary-foreground text-center mb-2">
            Any food allergies?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-8">
            Select all that apply, or skip if none
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {allergies.map((allergy, index) => {
            const Icon = allergy.icon;
            const selected = isSelected(allergy.id);
            
            return (
              <button
                key={allergy.id}
                onClick={() => toggleAllergy(allergy.id)}
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
                  {allergy.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-secondary">
        <Button
          onClick={() => onContinue(selectedAllergies)}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm"
        >
          {selectedAllergies.length === 0 ? "No Allergies" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default AllergiesSelection;

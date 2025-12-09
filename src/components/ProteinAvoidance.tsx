import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  X,
  Drumstick,
  Fish,
  Beef,
  Ham
} from "lucide-react";

const proteins = [
  { id: "pork", label: "Pork", icon: Ham },
  { id: "fish", label: "Fish", icon: Fish },
  { id: "beef", label: "Beef", icon: Beef },
  { id: "chicken", label: "Chicken", icon: Drumstick },
];

interface ProteinAvoidanceProps {
  onBack: () => void;
  onContinue: (avoidedProteins: string[]) => void;
}

const ProteinAvoidance = ({ onBack, onContinue }: ProteinAvoidanceProps) => {
  const [avoidedProteins, setAvoidedProteins] = useState<string[]>([]);

  const toggleProtein = (proteinId: string) => {
    setAvoidedProteins((prev) => {
      if (prev.includes(proteinId)) {
        return prev.filter((id) => id !== proteinId);
      }
      return [...prev, proteinId];
    });
  };

  const isAvoided = (proteinId: string) => avoidedProteins.includes(proteinId);

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
          <div className="h-1 flex-1 bg-accent rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-3xl text-secondary-foreground text-center mb-2">
            Any proteins to avoid?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-8">
            Tap to exclude from your meals
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {proteins.map((protein, index) => {
            const Icon = protein.icon;
            const avoided = isAvoided(protein.id);
            
            return (
              <button
                key={protein.id}
                onClick={() => toggleProtein(protein.id)}
                className={`
                  relative p-6 rounded-lg flex flex-col items-center gap-3 transition-all duration-200
                  animate-fade-in
                  ${avoided 
                    ? "bg-destructive/10 text-destructive ring-2 ring-destructive ring-offset-2 ring-offset-secondary" 
                    : "bg-background text-foreground hover:bg-background/90"
                  }
                `}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                {avoided && (
                  <div className="absolute top-2 right-2">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                )}
                <div className="relative">
                  <Icon className={`w-8 h-8 ${avoided ? "text-destructive/70" : "text-accent"}`} />
                  {avoided && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-0.5 bg-destructive rotate-45 rounded-full" />
                    </div>
                  )}
                </div>
                <span className={`text-sm font-medium text-center leading-tight ${avoided ? "line-through opacity-70" : ""}`}>
                  {avoided ? `No ${protein.label}` : protein.label}
                </span>
              </button>
            );
          })}
        </div>

        {avoidedProteins.length > 0 && (
          <p className="text-center text-secondary-foreground/60 text-xs mt-6 animate-fade-in">
            We'll exclude {avoidedProteins.length === 1 ? "this protein" : "these proteins"} from your meals
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-secondary">
        <Button
          onClick={() => onContinue(avoidedProteins)}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm"
        >
          {avoidedProteins.length === 0 ? "I Eat All Proteins" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default ProteinAvoidance;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flame, Drumstick, Leaf, Sprout, Carrot, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";

interface PlanSelectionProps {
  onBack: () => void;
  onContinue: (plan: string) => void;
  recommendedPlan?: string;
}

const plans = [
  {
    id: "traditional",
    title: "Traditional",
    description: "Balanced meals with variety",
    price: "$12.99",
    priceNote: "per meal",
    icon: Flame,
  },
  {
    id: "high-protein",
    title: "High Protein",
    description: "Extra protein for muscle building",
    price: "$14.99",
    priceNote: "per meal",
    icon: Drumstick,
  },
  {
    id: "paleo",
    title: "Paleo",
    description: "Whole foods, no grains or dairy",
    price: "$15.99",
    priceNote: "per meal",
    icon: Leaf,
  },
  {
    id: "paleo-lite",
    title: "Paleo Lite",
    description: "Lighter paleo portions",
    price: "$13.99",
    priceNote: "per meal",
    icon: Sprout,
  },
  {
    id: "vegetarian",
    title: "Vegetarian",
    description: "Plant-based protein meals",
    price: "$12.99",
    priceNote: "per meal",
    icon: Carrot,
  },
];

const PlanSelection = ({ onBack, onContinue, recommendedPlan = "traditional" }: PlanSelectionProps) => {
  const [selected, setSelected] = useState<string>(recommendedPlan);

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
      <ProgressBar currentStep={8} totalSteps={12} />

      {/* Content */}
      <div className="flex-1 px-4 py-3 min-h-0 overflow-y-auto">
        <div className="animate-fade-in mb-3">
          <h2 className="headline-serif text-xl text-secondary-foreground text-center mb-1">
            Based on your choices, we recommend
          </h2>
          <p className="text-center text-secondary-foreground/70 text-xs">
            You can change your plan at any time
          </p>
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          {plans.map((plan) => {
            const isSelected = selected === plan.id;
            const isRecommended = plan.id === recommendedPlan;
            const Icon = plan.icon;
            
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={cn(
                  "w-full p-3 rounded-lg transition-all duration-200 text-left relative",
                  isSelected
                    ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-secondary"
                    : "bg-background text-foreground hover:bg-background/90"
                )}
              >
                {isRecommended && (
                  <div className="absolute -top-2 right-3 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Recommended
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    isSelected ? "bg-accent-foreground/10" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      isSelected ? "text-accent-foreground" : "text-foreground"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "text-sm font-semibold",
                      isSelected ? "text-accent-foreground" : "text-foreground"
                    )}>
                      {plan.title}
                    </h3>
                    <p className={cn(
                      "text-xs",
                      isSelected ? "text-accent-foreground/80" : "text-muted-foreground"
                    )}>
                      {plan.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn(
                      "text-sm font-bold",
                      isSelected ? "text-accent-foreground" : "text-foreground"
                    )}>
                      {plan.price}
                    </p>
                    <p className={cn(
                      "text-[10px]",
                      isSelected ? "text-accent-foreground/70" : "text-muted-foreground"
                    )}>
                      {plan.priceNote}
                    </p>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                    isSelected
                      ? "border-accent-foreground bg-accent-foreground"
                      : "border-muted-foreground/30"
                  )}>
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
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

export default PlanSelection;

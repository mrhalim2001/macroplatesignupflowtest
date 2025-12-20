import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, nextMonday, addWeeks } from "date-fns";
import ProgressBar from "@/components/ProgressBar";

interface DeliveryDayProps {
  onBack: () => void;
  onContinue: (day: string, instructions: string) => void;
}

const DeliveryDay = ({ onBack, onContinue }: DeliveryDayProps) => {
  const upcomingMondays = useMemo(() => {
    const today = new Date();
    const firstMonday = nextMonday(today);
    return [
      firstMonday,
      addWeeks(firstMonday, 1),
      addWeeks(firstMonday, 2),
    ];
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(upcomingMondays[0]);
  const [instructions, setInstructions] = useState("");

  const handleContinue = () => {
    onContinue(format(selectedDate, "yyyy-MM-dd"), instructions);
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
      <ProgressBar currentStep={11} totalSteps={12} />

      {/* Content */}
      <div className="flex-1 px-4 py-4 min-h-0 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-2xl text-secondary-foreground text-center mb-1">
            When should we start?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-6">
            Choose your first delivery date
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {/* Monday date selector */}
          <div className="space-y-2">
            {upcomingMondays.map((monday, index) => {
              const isSelected = selectedDate.getTime() === monday.getTime();
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(monday)}
                  className={cn(
                    "w-full py-4 px-4 rounded-lg transition-all duration-200 flex items-center gap-3",
                    isSelected
                      ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-secondary"
                      : "bg-background text-foreground hover:bg-background/90"
                  )}
                >
                  <Calendar className="w-5 h-5 shrink-0" />
                  <span className="font-medium">
                    {format(monday, "EEEE, MMMM d")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Delivery instructions */}
          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-secondary-foreground">
              Delivery instructions (optional)
            </label>
            <Textarea
              placeholder="e.g., Leave at the front door..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-[80px] bg-background border-border resize-none text-sm"
            />
          </div>
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

export default DeliveryDay;

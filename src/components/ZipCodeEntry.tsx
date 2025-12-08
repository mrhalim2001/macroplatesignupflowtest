import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroMeal from "@/assets/hero-meal.jpg";

interface ZipCodeEntryProps {
  onContinue: (zipCode: string) => void;
}

const ZipCodeEntry = ({ onContinue }: ZipCodeEntryProps) => {
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZipCode(value);
    setError("");
  };

  const handleGetStarted = () => {
    if (zipCode.length !== 5) {
      setError("Please enter a valid 5-digit ZIP code");
      return;
    }
    onContinue(zipCode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Banner */}
      <div className="bg-secondary py-3 px-4">
        <p className="text-center text-xs font-medium tracking-[0.2em] text-secondary-foreground uppercase">
          Customize Your Program. Pause Anytime.
        </p>
      </div>

      {/* Header */}
      <header className="bg-background py-4 px-6 flex items-center justify-between border-b border-border">
        <div className="w-8" />
        <h1 className="text-xl font-semibold tracking-[0.15em] text-foreground font-sans">
          MACROPLATE
        </h1>
        <button className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
          <span className="w-5 h-0.5 bg-foreground" />
          <span className="w-5 h-0.5 bg-foreground" />
          <span className="w-5 h-0.5 bg-foreground" />
        </button>
      </header>

      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={heroMeal}
          alt="Delicious healthy meal with grilled chicken and fresh vegetables"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-secondary px-6 py-10 flex flex-col">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="headline-serif text-3xl md:text-4xl text-secondary-foreground leading-tight text-center mb-8">
            Award-winning Chefs<br />
            Health Driven Menus<br />
            Delivered Fresh Daily
          </h2>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
            <div className="flex-1">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter your ZIP code"
                value={zipCode}
                onChange={handleZipChange}
                className="h-14 bg-background border-0 text-foreground placeholder:text-muted-foreground text-base px-5 rounded-sm"
              />
              {error && (
                <p className="text-destructive text-sm mt-2 text-center">{error}</p>
              )}
            </div>
            <Button
              onClick={handleGetStarted}
              className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm"
            >
              Get Offer
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-background py-6 px-6 border-t border-border">
        <p className="text-center text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Ready to Eat. Stop Anytime.
        </p>
      </div>
    </div>
  );
};

export default ZipCodeEntry;

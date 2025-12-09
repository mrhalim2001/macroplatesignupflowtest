import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

interface EmailEntryProps {
  onBack: () => void;
  onContinue: (email: string, marketingOptIn: boolean) => void;
}

const EmailEntry = ({ onBack, onContinue }: EmailEntryProps) => {
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = () => {
    if (isValidEmail) {
      onContinue(email, marketingOptIn);
    }
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
      <ProgressBar currentStep={8} totalSteps={11} />

      {/* Content */}
      <div className="flex-1 px-4 py-6 min-h-0 flex flex-col">
        <div className="animate-fade-in mb-6">
          <h2 className="headline-serif text-3xl text-secondary-foreground text-center">
            Now let's setup your delivery details
          </h2>
        </div>

        <div className="animate-fade-in">
          <h3 className="headline-serif text-xl text-secondary-foreground text-center mb-1">
            What's your email?
          </h3>
          <p className="text-center text-secondary-foreground/70 text-sm mb-6">
            We'll use this to send order updates
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto w-full">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base bg-background border-border"
          />

          <div className="flex items-start gap-3">
            <Checkbox
              id="marketing"
              checked={marketingOptIn}
              onCheckedChange={(checked) => setMarketingOptIn(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="marketing" className="text-xs text-secondary-foreground/80 leading-relaxed cursor-pointer">
              I'd like to subscribe to marketing offers and updates. You can unsubscribe at any time.
            </label>
          </div>

          <p className="text-[10px] text-secondary-foreground/50 leading-relaxed">
            By continuing, you agree to receive emails from us and accept our{" "}
            <a href="#" className="underline hover:text-secondary-foreground/70">Terms & Conditions</a>
            {" "}and{" "}
            <a href="#" className="underline hover:text-secondary-foreground/70">Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-secondary shrink-0">
        <Button
          onClick={handleContinue}
          disabled={!isValidEmail}
          className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EmailEntry;

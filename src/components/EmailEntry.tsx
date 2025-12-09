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
      <ProgressBar currentStep={8} totalSteps={11} />

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-3xl text-secondary-foreground text-center mb-2">
            What's your email?
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-8">
            We'll use this to send order updates
          </p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 text-base bg-background border-border"
          />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="marketing"
                checked={marketingOptIn}
                onCheckedChange={(checked) => setMarketingOptIn(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="marketing" className="text-sm text-secondary-foreground/80 leading-relaxed cursor-pointer">
                I'd like to subscribe to marketing offers and updates. You can unsubscribe at any time.
              </label>
            </div>
          </div>

          <p className="text-xs text-secondary-foreground/50 leading-relaxed">
            By continuing, you agree to receive emails from us and accept our{" "}
            <a href="#" className="underline hover:text-secondary-foreground/70">Terms & Conditions</a>
            {" "}and{" "}
            <a href="#" className="underline hover:text-secondary-foreground/70">Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-secondary">
        <Button
          onClick={handleContinue}
          disabled={!isValidEmail}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EmailEntry;

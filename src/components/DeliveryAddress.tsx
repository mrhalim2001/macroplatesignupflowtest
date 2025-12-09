import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

interface DeliveryAddressProps {
  onBack: () => void;
  onContinue: (address: DeliveryAddressData) => void;
}

export interface DeliveryAddressData {
  firstName: string;
  lastName: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zipCode: string;
}

const DeliveryAddress = ({ onBack, onContinue }: DeliveryAddressProps) => {
  const [address, setAddress] = useState<DeliveryAddressData>({
    firstName: "",
    lastName: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const isValid =
    address.firstName.trim() &&
    address.lastName.trim() &&
    address.street.trim() &&
    address.city.trim() &&
    address.state.trim() &&
    address.zipCode.trim();

  const handleChange = (field: keyof DeliveryAddressData, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (isValid) {
      onContinue(address);
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
      <ProgressBar currentStep={9} totalSteps={11} />

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-3xl text-secondary-foreground text-center mb-6">
            Delivery address
          </h2>
        </div>

        <div className="space-y-3 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="First name"
              value={address.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="h-12 text-base bg-background border-border"
            />
            <Input
              placeholder="Last name"
              value={address.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="h-12 text-base bg-background border-border"
            />
          </div>

          <Input
            placeholder="Street address"
            value={address.street}
            onChange={(e) => handleChange("street", e.target.value)}
            className="h-12 text-base bg-background border-border"
          />

          <Input
            placeholder="Apt, suite, etc. (optional)"
            value={address.apt}
            onChange={(e) => handleChange("apt", e.target.value)}
            className="h-12 text-base bg-background border-border"
          />

          <Input
            placeholder="City"
            value={address.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="h-12 text-base bg-background border-border"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="State"
              value={address.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="h-12 text-base bg-background border-border"
            />
            <Input
              placeholder="ZIP code"
              value={address.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              className="h-12 text-base bg-background border-border"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-secondary">
        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DeliveryAddress;

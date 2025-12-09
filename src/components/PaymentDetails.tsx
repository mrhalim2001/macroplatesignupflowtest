import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, Apple } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";

interface PaymentDetailsProps {
  onBack: () => void;
  onContinue: (paymentMethod: string, cardDetails?: CardDetails) => void;
}

interface CardDetails {
  cardNumber: string;
  expiry: string;
  cvc: string;
  name: string;
}

const paymentMethods = [
  { id: "card", label: "Credit Card", icon: CreditCard },
  { id: "apple-pay", label: "Apple Pay", icon: Apple },
  { id: "paypal", label: "PayPal", icon: null },
];

const PaymentDetails = ({ onBack, onContinue }: PaymentDetailsProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("card");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const isCardValid =
    selectedMethod !== "card" ||
    (cardDetails.cardNumber.replace(/\s/g, "").length >= 15 &&
      cardDetails.expiry.length >= 5 &&
      cardDetails.cvc.length >= 3 &&
      cardDetails.name.trim());

  const handleCardChange = (field: keyof CardDetails, value: string) => {
    if (field === "cardNumber") {
      // Format card number with spaces
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
      setCardDetails((prev) => ({ ...prev, [field]: formatted }));
    } else if (field === "expiry") {
      // Format expiry as MM/YY
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      const formatted = cleaned.length > 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned;
      setCardDetails((prev) => ({ ...prev, [field]: formatted }));
    } else if (field === "cvc") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      setCardDetails((prev) => ({ ...prev, [field]: cleaned }));
    } else {
      setCardDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleContinue = () => {
    if (selectedMethod === "card") {
      onContinue(selectedMethod, cardDetails);
    } else {
      onContinue(selectedMethod);
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
      <ProgressBar currentStep={11} totalSteps={11} />

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-3xl text-secondary-foreground text-center mb-6">
            Payment details
          </h2>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {/* Payment method selector */}
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((method) => {
              const isSelected = selectedMethod === method.id;
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "py-3 px-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1",
                    isSelected
                      ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-secondary"
                      : "bg-background text-foreground hover:bg-background/90"
                  )}
                >
                  {Icon ? (
                    <Icon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-bold">PP</span>
                  )}
                  <span className="text-xs font-medium">{method.label}</span>
                </button>
              );
            })}
          </div>

          {/* Card details form */}
          {selectedMethod === "card" && (
            <div className="space-y-3 pt-2">
              <Input
                placeholder="Cardholder name"
                value={cardDetails.name}
                onChange={(e) => handleCardChange("name", e.target.value)}
                className="h-12 text-base bg-background border-border"
              />
              <Input
                placeholder="Card number"
                value={cardDetails.cardNumber}
                onChange={(e) => handleCardChange("cardNumber", e.target.value)}
                className="h-12 text-base bg-background border-border"
                inputMode="numeric"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardChange("expiry", e.target.value)}
                  className="h-12 text-base bg-background border-border"
                  inputMode="numeric"
                />
                <Input
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={(e) => handleCardChange("cvc", e.target.value)}
                  className="h-12 text-base bg-background border-border"
                  inputMode="numeric"
                />
              </div>
            </div>
          )}

          {/* Alternative payment info */}
          {selectedMethod === "apple-pay" && (
            <div className="bg-background rounded-lg p-6 text-center">
              <Apple className="w-12 h-12 mx-auto mb-3 text-foreground" />
              <p className="text-secondary-foreground/70 text-sm">
                You'll be prompted to confirm with Apple Pay when you place your order.
              </p>
            </div>
          )}

          {selectedMethod === "paypal" && (
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-[#003087] mb-3">PayPal</div>
              <p className="text-secondary-foreground/70 text-sm">
                You'll be redirected to PayPal to complete your payment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-secondary">
        <Button
          onClick={handleContinue}
          disabled={!isCardValid}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm disabled:opacity-50"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;

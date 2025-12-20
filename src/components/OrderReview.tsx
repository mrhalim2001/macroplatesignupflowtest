import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Calendar, MapPin, Plus } from "lucide-react";
import { format, parseISO } from "date-fns";
import ProgressBar from "@/components/ProgressBar";

interface OrderReviewProps {
  onBack: () => void;
  onContinue: () => void;
  orderData: {
    selectedPlan: string;
    addons: {
      snacks: boolean;
      smoothies: boolean;
    };
    deliveryDay: string;
    address: {
      firstName: string;
      lastName: string;
      street: string;
      city: string;
      state: string;
      zipCode: string;
    } | null;
    weeklyFrequency: string;
  };
}

const planDetails: Record<string, { title: string; price: number; description: string }> = {
  traditional: { title: "Traditional", price: 12.99, description: "Classic balanced meals" },
  paleo: { title: "Paleo", price: 14.99, description: "Grain-free, whole foods" },
  "paleo-lite": { title: "Paleo Lite", price: 13.99, description: "Lower calorie paleo" },
  "high-protein": { title: "High Protein", price: 15.99, description: "Extra protein focus" },
  vegetarian: { title: "Vegetarian", price: 12.99, description: "Plant-forward meals" },
};

const addonPrices = {
  snacks: 4.99,
  smoothies: 5.99,
};

const OrderReview = ({ onBack, onContinue, orderData }: OrderReviewProps) => {
  const plan = planDetails[orderData.selectedPlan] || planDetails.traditional;
  const mealsPerWeek = parseInt(orderData.weeklyFrequency) || 5;
  
  const weeklyPlanCost = plan.price * mealsPerWeek;
  const snacksCost = orderData.addons.snacks ? addonPrices.snacks * mealsPerWeek : 0;
  const smoothiesCost = orderData.addons.smoothies ? addonPrices.smoothies * mealsPerWeek : 0;
  const weeklyTotal = weeklyPlanCost + snacksCost + smoothiesCost;

  const formatDeliveryDate = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      return format(date, "EEEE, MMMM d, yyyy");
    } catch {
      return dateStr;
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

      {/* Progress Bar */}
      <div className="px-4 pb-2">
        <ProgressBar currentStep={11} totalSteps={12} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 min-h-0 overflow-y-auto">
        <div className="animate-fade-in">
          <h2 className="headline-serif text-2xl text-secondary-foreground text-center mb-1">
            Review Your Order
          </h2>
          <p className="text-center text-secondary-foreground/70 text-sm mb-6">
            Make sure everything looks good
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {/* Plan Details */}
          <div className="bg-background rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <Package className="w-5 h-5" />
              <span className="font-semibold">Your Plan</span>
            </div>
            <div className="space-y-2 pl-7">
              <div className="flex justify-between">
                <span className="text-foreground">{plan.title} Plan</span>
                <span className="text-foreground font-medium">${plan.price}/meal</span>
              </div>
              <p className="text-foreground/60 text-sm">{plan.description}</p>
              <div className="flex justify-between text-foreground/80">
                <span>{mealsPerWeek} meals per week</span>
                <span>${weeklyPlanCost.toFixed(2)}/week</span>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          {(orderData.addons.snacks || orderData.addons.smoothies) && (
            <div className="bg-background rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-foreground">
                <Plus className="w-5 h-5" />
                <span className="font-semibold">Add-ons</span>
              </div>
              <div className="space-y-2 pl-7">
                {orderData.addons.snacks && (
                  <div className="flex justify-between text-foreground/80">
                    <span>Snacks ({mealsPerWeek}x)</span>
                    <span>${snacksCost.toFixed(2)}/week</span>
                  </div>
                )}
                {orderData.addons.smoothies && (
                  <div className="flex justify-between text-foreground/80">
                    <span>Smoothies ({mealsPerWeek}x)</span>
                    <span>${smoothiesCost.toFixed(2)}/week</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Delivery Date */}
          <div className="bg-background rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">First Delivery</span>
            </div>
            <div className="pl-7">
              <p className="text-foreground/80">{formatDeliveryDate(orderData.deliveryDay)}</p>
            </div>
          </div>

          {/* Delivery Address */}
          {orderData.address && (
            <div className="bg-background rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Delivery Address</span>
              </div>
              <div className="pl-7 text-foreground/80 space-y-0.5">
                <p>{orderData.address.firstName} {orderData.address.lastName}</p>
                <p>{orderData.address.street}</p>
                <p>{orderData.address.city}, {orderData.address.state} {orderData.address.zipCode}</p>
              </div>
            </div>
          )}

          {/* Weekly Total */}
          <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Weekly Total</span>
              <span className="text-xl font-bold text-accent">${weeklyTotal.toFixed(2)}</span>
            </div>
            <p className="text-foreground/60 text-sm mt-1">Billed weekly, cancel anytime</p>
          </div>
        </div>
      </div>

      {/* Bottom button */}
      <div className="sticky bottom-0 px-4 py-4 bg-secondary border-t border-secondary-foreground/10">
        <Button 
          onClick={onContinue}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base font-medium"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default OrderReview;

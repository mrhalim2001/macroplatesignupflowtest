import { Button } from "@/components/ui/button";
import { Check, Truck, Calendar, Utensils } from "lucide-react";
import heroMeal from "@/assets/hero-meal.jpg";

interface OrderConfirmationProps {
  deliveryDay: string;
}

const OrderConfirmation = ({ deliveryDay }: OrderConfirmationProps) => {
  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="h-dvh flex flex-col bg-secondary overflow-hidden">
      {/* Header */}
      <header className="bg-background py-3 px-6 flex items-center justify-between border-b border-border shrink-0">
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

      {/* Content */}
      <div className="flex-1 px-4 py-6 min-h-0 overflow-y-auto flex flex-col items-center justify-center">
        {/* Success animation */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center animate-scale-in">
            <Check className="w-10 h-10 text-accent-foreground" strokeWidth={3} />
          </div>
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-accent/30 animate-ping" />
        </div>

        <div className="animate-fade-in text-center" style={{ animationDelay: "0.2s" }}>
          <h2 className="headline-serif text-2xl text-secondary-foreground mb-1">
            Thank you!
          </h2>
          <p className="text-secondary-foreground/70 text-base mb-6">
            Your order has been placed
          </p>
        </div>

        {/* Order info cards */}
        <div className="w-full max-w-sm space-y-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="bg-background rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">First delivery</p>
              <p className="font-semibold text-foreground text-sm">{formatDay(deliveryDay)}</p>
            </div>
          </div>

          <div className="bg-background rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Delivery status</p>
              <p className="font-semibold text-foreground text-sm">Being prepared</p>
            </div>
          </div>

          <div className="bg-background rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Utensils className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fresh meals</p>
              <p className="font-semibold text-foreground text-sm">Chef-prepared for you</p>
            </div>
          </div>
        </div>

        {/* Professional meal photo */}
        <div className="mt-6 animate-fade-in w-full max-w-sm" style={{ animationDelay: "0.6s" }}>
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={heroMeal}
              alt="Delicious chef-prepared meal"
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-secondary shrink-0">
        <Button
          onClick={() => window.location.reload()}
          className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm"
        >
          View My Account
        </Button>
        <p className="text-center text-secondary-foreground/50 text-[10px] mt-2">
          We've sent a confirmation email with your order details
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;

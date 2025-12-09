import { Button } from "@/components/ui/button";
import { Check, Truck, Calendar, Utensils } from "lucide-react";

interface OrderConfirmationProps {
  deliveryDay: string;
}

const OrderConfirmation = ({ deliveryDay }: OrderConfirmationProps) => {
  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      {/* Header */}
      <header className="bg-background py-4 px-4 flex items-center justify-center border-b border-border">
        <h1 className="text-lg font-semibold tracking-[0.1em] text-foreground font-sans">
          MACROPLATE
        </h1>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-12 flex flex-col items-center justify-center">
        {/* Success animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center animate-scale-in">
            <Check className="w-12 h-12 text-accent-foreground" strokeWidth={3} />
          </div>
          {/* Decorative rings */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-accent/30 animate-ping" />
        </div>

        <div className="animate-fade-in text-center" style={{ animationDelay: "0.2s" }}>
          <h2 className="headline-serif text-3xl text-secondary-foreground mb-2">
            Thank you!
          </h2>
          <p className="text-secondary-foreground/70 text-lg mb-8">
            Your order has been placed
          </p>
        </div>

        {/* Order info cards */}
        <div className="w-full max-w-sm space-y-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="bg-background rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">First delivery</p>
              <p className="font-semibold text-foreground">{formatDay(deliveryDay)}</p>
            </div>
          </div>

          <div className="bg-background rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Truck className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivery status</p>
              <p className="font-semibold text-foreground">Being prepared</p>
            </div>
          </div>

          <div className="bg-background rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Utensils className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fresh meals</p>
              <p className="font-semibold text-foreground">Chef-prepared for you</p>
            </div>
          </div>
        </div>

        {/* Decorative meal illustration */}
        <div className="mt-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <div className="text-6xl">🥗</div>
            </div>
            {/* Floating food emojis */}
            <div className="absolute -top-2 -left-4 text-2xl animate-bounce" style={{ animationDelay: "0.1s" }}>🥑</div>
            <div className="absolute -top-1 -right-3 text-2xl animate-bounce" style={{ animationDelay: "0.3s" }}>🍗</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>🥦</div>
            <div className="absolute -bottom-1 -right-4 text-2xl animate-bounce" style={{ animationDelay: "0.7s" }}>🍳</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-secondary">
        <Button
          onClick={() => window.location.reload()}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold tracking-[0.15em] text-sm uppercase rounded-sm"
        >
          View My Account
        </Button>
        <p className="text-center text-secondary-foreground/50 text-xs mt-4">
          We've sent a confirmation email with your order details
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;

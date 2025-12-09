import { useState } from "react";
import ZipCodeEntry from "@/components/ZipCodeEntry";
import GoalsSelection from "@/components/GoalsSelection";
import MealPreferences from "@/components/MealPreferences";
import AllergiesSelection from "@/components/AllergiesSelection";
import ProteinAvoidance from "@/components/ProteinAvoidance";
import DailyMealsSelection from "@/components/DailyMealsSelection";
import WeeklyFrequency from "@/components/WeeklyFrequency";
import PlanSelection from "@/components/PlanSelection";
import EmailEntry from "@/components/EmailEntry";
import DeliveryAddress, { DeliveryAddressData } from "@/components/DeliveryAddress";
import DeliveryDay from "@/components/DeliveryDay";
import PaymentDetails from "@/components/PaymentDetails";
import OrderConfirmation from "@/components/OrderConfirmation";

type Step = 
  | "zipcode" 
  | "goals" 
  | "meals" 
  | "allergies" 
  | "proteins" 
  | "daily-meals" 
  | "weekly-frequency"
  | "plan-selection"
  | "email"
  | "address"
  | "delivery-day"
  | "payment"
  | "confirmation";

interface SignupData {
  zipCode: string;
  goals: string[];
  mealPreferences: string[];
  allergies: string[];
  avoidedProteins: string[];
  dailyMeals: string;
  weeklyFrequency: string;
  selectedPlan: string;
  email: string;
  marketingOptIn: boolean;
  address: DeliveryAddressData | null;
  deliveryDay: string;
  deliveryInstructions: string;
  paymentMethod: string;
}

const Index = () => {
  const [step, setStep] = useState<Step>("zipcode");
  const [signupData, setSignupData] = useState<SignupData>({
    zipCode: "",
    goals: [],
    mealPreferences: [],
    allergies: [],
    avoidedProteins: [],
    dailyMeals: "",
    weeklyFrequency: "",
    selectedPlan: "",
    email: "",
    marketingOptIn: true,
    address: null,
    deliveryDay: "",
    deliveryInstructions: "",
    paymentMethod: "",
  });

  const handleZipCodeSubmit = (zipCode: string) => {
    setSignupData((prev) => ({ ...prev, zipCode }));
    setStep("goals");
  };

  const handleGoalsSubmit = (goals: string[]) => {
    setSignupData((prev) => ({ ...prev, goals }));
    setStep("meals");
  };

  const handleMealsSubmit = (mealPreferences: string[]) => {
    setSignupData((prev) => ({ ...prev, mealPreferences }));
    setStep("allergies");
  };

  const handleAllergiesSubmit = (allergies: string[]) => {
    setSignupData((prev) => ({ ...prev, allergies }));
    setStep("proteins");
  };

  const handleProteinsSubmit = (avoidedProteins: string[]) => {
    setSignupData((prev) => ({ ...prev, avoidedProteins }));
    setStep("daily-meals");
  };

  const handleDailyMealsSubmit = (dailyMeals: string) => {
    setSignupData((prev) => ({ ...prev, dailyMeals }));
    setStep("weekly-frequency");
  };

  const handleWeeklyFrequencySubmit = (weeklyFrequency: string) => {
    setSignupData((prev) => ({ ...prev, weeklyFrequency }));
    setStep("plan-selection");
  };

  const getRecommendedPlan = () => {
    // Logic to recommend plan based on user choices
    if (signupData.avoidedProteins.includes("beef") && signupData.avoidedProteins.includes("chicken") && signupData.avoidedProteins.includes("pork")) {
      return "vegetarian";
    }
    if (signupData.goals.includes("muscle") || signupData.goals.includes("athletic")) {
      return "high-protein";
    }
    if (signupData.allergies.includes("gluten") || signupData.allergies.includes("dairy")) {
      return "paleo";
    }
    if (signupData.goals.includes("weight-loss")) {
      return "paleo-lite";
    }
    return "traditional";
  };

  const handlePlanSubmit = (selectedPlan: string) => {
    setSignupData((prev) => ({ ...prev, selectedPlan }));
    setStep("email");
  };

  const handleEmailSubmit = (email: string, marketingOptIn: boolean) => {
    setSignupData((prev) => ({ ...prev, email, marketingOptIn }));
    setStep("address");
  };

  const handleAddressSubmit = (address: DeliveryAddressData) => {
    setSignupData((prev) => ({ ...prev, address }));
    setStep("delivery-day");
  };

  const handleDeliveryDaySubmit = (deliveryDay: string, deliveryInstructions: string) => {
    setSignupData((prev) => ({ ...prev, deliveryDay, deliveryInstructions }));
    setStep("payment");
  };

  const handlePaymentSubmit = (paymentMethod: string) => {
    setSignupData((prev) => ({ ...prev, paymentMethod }));
    console.log("Order placed:", { ...signupData, paymentMethod });
    setStep("confirmation");
  };

  const handleGoBack = () => {
    const stepOrder: Step[] = [
      "zipcode", "goals", "meals", "allergies", "proteins", 
      "daily-meals", "weekly-frequency", "plan-selection", "email", "address", "delivery-day", "payment"
    ];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <>
      {step === "zipcode" && (
        <ZipCodeEntry onContinue={handleZipCodeSubmit} />
      )}
      {step === "goals" && (
        <GoalsSelection onBack={handleGoBack} onContinue={handleGoalsSubmit} />
      )}
      {step === "meals" && (
        <MealPreferences onBack={handleGoBack} onContinue={handleMealsSubmit} />
      )}
      {step === "allergies" && (
        <AllergiesSelection onBack={handleGoBack} onContinue={handleAllergiesSubmit} />
      )}
      {step === "proteins" && (
        <ProteinAvoidance onBack={handleGoBack} onContinue={handleProteinsSubmit} />
      )}
      {step === "daily-meals" && (
        <DailyMealsSelection onBack={handleGoBack} onContinue={handleDailyMealsSubmit} />
      )}
      {step === "weekly-frequency" && (
        <WeeklyFrequency onBack={handleGoBack} onContinue={handleWeeklyFrequencySubmit} />
      )}
      {step === "plan-selection" && (
        <PlanSelection onBack={handleGoBack} onContinue={handlePlanSubmit} recommendedPlan={getRecommendedPlan()} />
      )}
      {step === "email" && (
        <EmailEntry onBack={handleGoBack} onContinue={handleEmailSubmit} />
      )}
      {step === "address" && (
        <DeliveryAddress onBack={handleGoBack} onContinue={handleAddressSubmit} />
      )}
      {step === "delivery-day" && (
        <DeliveryDay onBack={handleGoBack} onContinue={handleDeliveryDaySubmit} />
      )}
      {step === "payment" && (
        <PaymentDetails onBack={handleGoBack} onContinue={handlePaymentSubmit} />
      )}
      {step === "confirmation" && (
        <OrderConfirmation deliveryDay={signupData.deliveryDay || "sunday"} />
      )}
    </>
  );
};

export default Index;

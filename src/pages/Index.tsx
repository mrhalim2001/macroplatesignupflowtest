import { useState } from "react";
import ZipCodeEntry from "@/components/ZipCodeEntry";
import GoalsSelection from "@/components/GoalsSelection";
import MealPreferences from "@/components/MealPreferences";

type Step = "zipcode" | "goals" | "meals";

interface SignupData {
  zipCode: string;
  goals: string[];
  mealPreferences: string[];
}

const Index = () => {
  const [step, setStep] = useState<Step>("zipcode");
  const [signupData, setSignupData] = useState<SignupData>({
    zipCode: "",
    goals: [],
    mealPreferences: [],
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
    // TODO: Navigate to next step
    console.log("Signup data:", { ...signupData, mealPreferences });
  };

  const handleGoBack = () => {
    if (step === "goals") {
      setStep("zipcode");
    } else if (step === "meals") {
      setStep("goals");
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
    </>
  );
};

export default Index;

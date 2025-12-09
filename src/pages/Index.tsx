import { useState } from "react";
import ZipCodeEntry from "@/components/ZipCodeEntry";
import GoalsSelection from "@/components/GoalsSelection";
import MealPreferences from "@/components/MealPreferences";
import AllergiesSelection from "@/components/AllergiesSelection";
import ProteinAvoidance from "@/components/ProteinAvoidance";

type Step = "zipcode" | "goals" | "meals" | "allergies" | "proteins";

interface SignupData {
  zipCode: string;
  goals: string[];
  mealPreferences: string[];
  allergies: string[];
  avoidedProteins: string[];
}

const Index = () => {
  const [step, setStep] = useState<Step>("zipcode");
  const [signupData, setSignupData] = useState<SignupData>({
    zipCode: "",
    goals: [],
    mealPreferences: [],
    allergies: [],
    avoidedProteins: [],
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
    // TODO: Navigate to next step
    console.log("Signup data:", { ...signupData, avoidedProteins });
  };

  const handleGoBack = () => {
    if (step === "goals") {
      setStep("zipcode");
    } else if (step === "meals") {
      setStep("goals");
    } else if (step === "allergies") {
      setStep("meals");
    } else if (step === "proteins") {
      setStep("allergies");
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
    </>
  );
};

export default Index;

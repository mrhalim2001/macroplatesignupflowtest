import { useState } from "react";
import ZipCodeEntry from "@/components/ZipCodeEntry";
import GoalsSelection from "@/components/GoalsSelection";
import MealPreferences from "@/components/MealPreferences";
import AllergiesSelection from "@/components/AllergiesSelection";
import ProteinAvoidance from "@/components/ProteinAvoidance";
import DailyMealsSelection from "@/components/DailyMealsSelection";
import WeeklyFrequency from "@/components/WeeklyFrequency";

type Step = "zipcode" | "goals" | "meals" | "allergies" | "proteins" | "daily-meals" | "weekly-frequency";

interface SignupData {
  zipCode: string;
  goals: string[];
  mealPreferences: string[];
  allergies: string[];
  avoidedProteins: string[];
  dailyMeals: string;
  weeklyFrequency: string;
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
    // TODO: Navigate to next step
    console.log("Signup data:", { ...signupData, weeklyFrequency });
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
    } else if (step === "daily-meals") {
      setStep("proteins");
    } else if (step === "weekly-frequency") {
      setStep("daily-meals");
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
    </>
  );
};

export default Index;

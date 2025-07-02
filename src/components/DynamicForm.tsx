import React, { useEffect, useState } from "react";
import axios from "axios";
import FormStep from "./FormStep";
import { useQueryParams } from "../hooks/useQueryParams";

export const DynamicForm = () => {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const query = useQueryParams();

  useEffect(() => {
    axios
      .get("https://api.winazbet.com/v3/default/config", {
        timeout: 10000, 
      })
      .then((res) => {
        console.log(" API Config Loaded:", res.data);
        const registerSteps = res.data.form?.register || [];
        setSteps(registerSteps);
      })
      .catch((err) => {
        console.error(" API ERROR:", err);
      });
  }, []);

  if (steps.length === 0) {
    return <p> Loading or Invalid Config...</p>;
  }

  const step = steps[currentStep];
  if (!step) {
    return <p> Step Not Found</p>;
  }

  const handleNext = (stepData: any) => {
    console.log(" Step Data:", stepData);
    setFormData((prev) => ({ ...prev, ...stepData }));

    if (currentStep + 1 < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const finalPayload = {
        ...Object.fromEntries(query.entries()),
        ...formData,
        ...stepData,
      };
      console.log(" Final Payload:", finalPayload);
    }
  };

  return (
    <div>
      <FormStep fields={step.fields} onNext={handleNext} />
    </div>
  );
};

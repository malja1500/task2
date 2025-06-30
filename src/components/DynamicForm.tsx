

import React, { useEffect, useState } from "react";
import axios from "axios";
import FormStep from "./FormStep";
import { FormConfig } from "../types/form";
import { useQueryParams } from "../hooks/useQueryParams";

export const DynamicForm = () => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({}); 
  const query = useQueryParams();

  useEffect(() => {
    axios
      .get("https://716949ea-d279-411c-995f-b2207f7cff33.mock.pstmn.io/v3/default/config")
      .then((res) => {
        console.log("✅ API RESPONSE:", res.data);
        const registerForm = res.data?.form?.register;
        console.log("✅ registerForm:", registerForm);
        setConfig(registerForm);
      })
      .catch((err) => {
        console.error("❌ API ERROR:", err);
      });
  }, []);

  if (!config || !config.steps || config.steps.length === 0) {
    return <p>⏳ Loading or Invalid Config...</p>;
  }

  const step = config.steps[currentStep];
  if (!step) {
    return <p>❌ Step Not Found</p>;
  }

  const handleNext = (stepData: any) => {
    console.log("✅ Step Data:", stepData);
    setFormData((prev) => ({ ...prev, ...stepData }));

    if (currentStep + 1 < config.steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
    
      const finalPayload = {
        ...Object.fromEntries(query.entries()),
        ...formData,
        ...stepData,
        fixedParam: "example" 
      };
      console.log("🚀 Final Payload:", finalPayload);
      
    }
  };

  return (
    <div>
      <h2>{step.title}</h2>
      <FormStep fields={step.fields} onNext={handleNext} />
    </div>
  );
};

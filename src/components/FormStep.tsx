

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { FormField as FormFieldType } from "../types/form";
import { z } from "zod";

interface Props {
  fields: FormFieldType[];
  onNext: (stepData: any) => void; 
}

const FormStep: React.FC<Props> = ({ fields, onNext }) => {
  const schema = z.object(
    fields.reduce((acc, field) => {
      if (field.required) {
        acc[field.name] = z.string().min(1, `${field.label} الزامی است`);
      } else {
        acc[field.name] = z.string().optional();
      }
      return acc;
    }, {} as any)
  );

  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    onNext(data); 
  };

  
  const grouped = fields.reduce((acc: Record<string, FormFieldType[]>, field) => {
    const rowKey = field.row ? `row-${field.row}` : `row-${field.name}`;
    if (!acc[rowKey]) acc[rowKey] = [];
    acc[rowKey].push(field);
    return acc;
  }, {});

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {Object.entries(grouped).map(([rowKey, rowFields]) => (
          <div key={rowKey} style={{ display: "flex", gap: "1rem" }}>
            {rowFields.map((field) => (
              <FormField key={field.name} field={field} />
            ))}
          </div>
        ))}
        <button type="submit">ادامه</button>
      </form>
    </FormProvider>
  );
};

export default FormStep;

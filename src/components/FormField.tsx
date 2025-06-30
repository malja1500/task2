

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField as FormFieldType } from "../types/form";

interface Props {
  field: FormFieldType;
}

const FormField: React.FC<Props> = ({ field }) => {
  const { register, watch, formState: { errors } } = useFormContext();

  
  if (field.dependsOn) {
    const dependsValue = watch(field.dependsOn.field);
    if (dependsValue !== field.dependsOn.value) {
      return null;
    }
  }

  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return (
        <div>
          <label>{field.label}</label>
          <input {...register(field.name)} type={field.type} placeholder={field.placeholder} />
          {errors[field.name] && <p>{errors[field.name]?.message as string}</p>}
        </div>
      );
    case "checkbox":
      return (
        <div>
          <label>
            <input type="checkbox" {...register(field.name)} /> {field.label}
          </label>
        </div>
      );
    case "select":
      return (
        <div>
          <label>{field.label}</label>
          <select {...register(field.name)}>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    default:
      return null;
  }
};

export default FormField;

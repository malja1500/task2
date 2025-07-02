import React from "react";
import FormField from "./FormField";
import { useForm } from "react-hook-form";

interface Props {
  fields: any[];
  onNext: (data: any) => void;
}

const FormStep = ({ fields = [], onNext }: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(" Form Step Submitted:", data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-step">
      {fields
        ?.filter(
          (field) =>
            !!field &&
            !!field.name &&
            !["widget", "captcha"].includes(field.type)
        )
        .map((field, index) => (
          <FormField
            key={field.name || `field-${index}`}
            field={field}
            register={register}
          />
        ))}

      {!fields.some(
        (field) => ["submit", "button"].includes(field?.type)
      ) && (
        <button type="submit" className="submit-btn">
          ارسال
        </button>
      )}
    </form>
  );
};

export default FormStep;

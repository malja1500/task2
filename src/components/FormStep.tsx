import React from "react";
import FormField from "./FormField";
import { useForm } from "react-hook-form";

interface Props {
  fields: any[];
  onNext: (data: any) => void;
}

const FormStep = ({ fields = [], onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Step Submitted:", data);
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
          <div key={field.name || `field-${index}`}>
            <FormField field={field} register={register} />
            {errors[field.name] && (
              <p className="error-message">
                {field.label?.message || field.name} الزامی است
              </p>
            )}
          </div>
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

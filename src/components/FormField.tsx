import React from "react";

interface Props {
  field: any;
  register: any;
}

const FormField = ({ field, register }: Props) => {
  const required = field.required ?? field.rules?.required ?? true;

  if (["text", "email", "password"].includes(field.type)) {
    return (
      <div className="form-field">
        <label>{field.label?.message || field.name}</label>
        <input
          type={field.type}
          {...register(field.name, { required })}
        />
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="form-field">
        <label>
          <input
            type="checkbox"
            {...register(field.name, { required })}
          />{" "}
          {field.label?.message || field.name}
        </label>
      </div>
    );
  }

  if (field.type === "button" || field.type === "submit") {
    return (
      <div className="form-field">
        <button type="submit">
          {field.label?.message || "ارسال"}
        </button>
      </div>
    );
  }

  if (field.type === "select") {
    let options: any[] = [];
    if (Array.isArray(field.options)) {
      options = field.options;
    } else if (typeof field.options === "object" && field.options !== null) {
      options = Object.entries(field.options).map(([value, label]) => ({
        value,
        label,
      }));
    } else {
      console.warn("select field options fallback ", field);
      return null;
    }

    return (
      <div className="form-field">
        <label>{field.label?.message || field.name}</label>
        <select {...register(field.name, { required })}>
          <option value="">انتخاب کنید...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "datePicker") {
    return (
      <div className="form-field">
        <label>{field.label?.message || field.name}</label>
        <input
          type="date"
          {...register(field.name, { required })}
        />
      </div>
    );
  }

  console.warn("Unknown field type:", field.type, field);
  return null;
};

export default FormField;

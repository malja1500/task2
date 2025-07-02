import React from "react";

interface Props {
  field: any;
  register: any;
}

const FormField = ({ field, register }: Props) => {

  if (["text", "email", "password"].includes(field.type)) {
    return (
      <div className="form-field">
        <label>{field.label?.message || field.name}</label>
        <input
          type={field.type}
          {...register(field.name, { required: field.required })}
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
            {...register(field.name, { required: field.required })}
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
    const options = Array.isArray(field.options) ? field.options : [];
    if (options.length === 0) {
      console.warn(" WARNING: select field options fallback ", field);
      return null;
    }
    return (
      <div className="form-field">
        <label>{field.label?.message || field.name}</label>
        <select {...register(field.name, { required: field.required })}>
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label?.message || option.value}
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
          {...register(field.name, { required: field.required })}
        />
      </div>
    );
  }

  
  if (field.type === "captcha") {
    console.warn(" CAPTCHA ", field);
    return null;
  }

  
  if (field.type === "widget") {
    console.warn(" Unknown widget field →", field);
    return null;
  }

  
  console.warn("Unknown field type:", field.type, field);
  return null;
};

export default FormField;

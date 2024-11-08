import React from "react";
import { Controller } from "react-hook-form";

export default function FormInput({ label, name, control, validation, errors }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <input
            type="text"
            id={name}
            {...field}
            className={`form-input ${errors[name] ? "error-border" : ""}`}
          />
        )}
      />
      {errors[name] && <p className="error-message">{errors[name].message}</p>}
    </div>
  );
}

import { React, useState } from "react";
import { Controller } from "react-hook-form";

export default function FormFileInput({
  label,
  name,
  control,
  validation,
  errors,
  onFileChange,
}) {
  const [fileName, setFileName] = useState("");

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <input
            type="file"
            id={name}
            {...field}
            className={`form-input ${errors[name] ? "error-border" : ""}`}
            accept=".jpg, .png"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                const reader = new FileReader();
                var blobValue;
                reader.onloadend = () => {
                  const arrayBuffer = reader.result;
                  const blob = new Blob([arrayBuffer], {
                    type: selectedFile.type,
                  });
                  blobValue = blob;
                  onFileChange(blob); // Pass the Blob to the parent through the callback
                  field.onChange(e);
                };
                reader.readAsArrayBuffer(selectedFile);
              } else {
                onFileChange(null);
                // field.onChange("");
              }
            }}
            ref={field.ref}
          />
        )}
      />
      {errors[name] && <p className="error-message">{errors[name].message}</p>}
    </div>
  );
}

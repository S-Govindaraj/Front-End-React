// MyForm.js
import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../common/hook-form/inputField";
import FormFileInput from "../../common/hook-form/uploadFile";
import "./addpage.css"; // Import CSS for styling
import todolistService from "../../api/todolist.service";

export default function MyForm({ onRefresh }) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [imageBlob, setImageBlob] = useState(null);
  const watchImage = watch("image"); // Watching the 'image' input field

  useEffect(() => {
    console.log("watchImage && watchImage[0] instanceof File  --", imageBlob);
  }, [watchImage]);

  const onSubmit = async (data) => {
    // Prepare the form data
    console.log(data, imageBlob);

    const formData = new FormData();
    if (imageBlob) {
      formData.append("image", imageBlob, "uploaded_image.jpg");
    }
    formData.append("tite", data?.title);
    formData.append("description", data?.description);

    console.log("formData  --", formData);

    try {
      const response = await todolistService.addTodoList(formData);
      console.log("Response:", response);
      onRefresh();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <FormInput
        label="Title"
        name="title"
        control={control}
        validation={{ required: "Title is required" }}
        errors={errors}
      />
      <FormInput
        label="Description"
        name="description"
        control={control}
        validation={{
          required: "Description is required",
          // pattern: {
          //   value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
          //   message: "Invalid email format",
          // },
        }}
        errors={errors}
      />
      <FormFileInput
        label="Image"
        name="image"
        control={control}
        onFileChange={(imgBlob) => setImageBlob(imgBlob)}
        // {...register("image", { onChange: handleImageChange })}
        validation={{ required: "Image is required" }}
        errors={errors}
      />

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}

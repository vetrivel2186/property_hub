import { api } from "./api";

export const uploadPrimaryImage = async (
  image: File
) => {
  const formData = new FormData();

  formData.append("image", image);

  const response = await api.post(
    "/uploads/property-image-upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const uploadMultipleImages = async (
  images: File[]
) => {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.post(
    "/uploads/property-image-multiple-upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
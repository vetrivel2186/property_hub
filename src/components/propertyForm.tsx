"use client";

import { useState } from "react";
import {
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  createPropertySchema,
  CreatePropertyFormData,
} from "@/schema/propertySchema";
import { createProperty, imageUrl, insertPropertyImage } from "@/services/propertyApi";
import { uploadMultipleImages, uploadPrimaryImage } from "@/services/uploadApi";
import { isPrimary } from "node:cluster";
import { useRouter } from "next/navigation";

export default function PropertyForm() {
  const router = useRouter();
  const [images, setImages] =
    useState<File[]>([]);
  console.log(images)
  const [primaryImageIndex, setPrimaryImageIndex] =
    useState(0);
  const [primaryImage, setPrimaryImage] = useState<File>()
  console.log(primaryImage)
  const [imageError, setImageError] =
    useState("");
  // const [propertyresult, setPropertyResult] = useState<any>({})
  let propertyresult:any = {};
  console.log(propertyresult)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePropertyFormData>({
    resolver: zodResolver(
      createPropertySchema
    ),
  });

  const MAX_FILES = 10;

  const MAX_TOTAL_SIZE =
    5 * 1024 * 1024; // 5MB

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const files = Array.from(
      e.target.files
    );
    setPrimaryImage(files[0])
    if (files.length > MAX_FILES) {
      setImageError(
        "Maximum 10 images allowed"
      );

      return;
    }

    const totalSize =
      files.reduce(
        (sum, file) =>
          sum + file.size,
        0
      );

    if (
      totalSize >
      MAX_TOTAL_SIZE
    ) {
      setImageError(
        "Total image size should not exceed 5MB"
      );

      return;
    }

    const invalidFile =
      files.find(
        (file) =>
          !allowedTypes.includes(
            file.type
          )
      );

    if (invalidFile) {
      setImageError(
        "Only JPG, PNG and WEBP images are allowed"
      );

      return;
    }
    setImages(Array.from(e.target.files));

    setImageError("");
  };

  const onSubmit = async (
    data: CreatePropertyFormData
  ) => {

    if (images.length === 0) {
      setImageError(
        "Please upload at least one image"
      );

      return;
    }

    console.log(data);
    console.log(images);
    console.log(
      "Primary Image:",
      primaryImageIndex
    );

    let primaryImageUrl = await primaryImagesUpload();
    await createPropertyFunc({ ...data, primaryImageUrl })
    if (images.length > 1) {

      uploadMultipleImagesFunc();
    }
  };
  const createPropertyFunc = async (data: CreatePropertyFormData) => {
    try {
      const result = await createProperty(data);
      propertyresult =result.data;

        console.log(result)
      let body: any = [{ imageUrl: data.primaryImageUrl, isPrimary: true }];
      await insertPropertyImageFunc(result.data.id, body);
    } catch (error) {
      console.log(error)
    }
  }

  const primaryImagesUpload = async () => {
    try {
      if (!primaryImage) {
        setImageError("Image is required");
        return;
      }
      const result = await uploadPrimaryImage(primaryImage);
      return result?.imageUrl;

    } catch (error) {
      console.log(error)
    }
  }

  const uploadMultipleImagesFunc = async () => {
    try {
      let newArray = [...images]
      console.log(newArray)
      newArray.splice(primaryImageIndex, 1)
      const result: any = await uploadMultipleImages(newArray);
      console.log("multiple result", result)
      let newBody = result.images.map((data: any) => {
        return {
          imageUrl: data?.url,
          isPrimary: false
        }
      })
      console.log("propertyresult", propertyresult)
      await insertPropertyImageFunc(propertyresult.id, newBody)
      router.push("/properties")
    } catch (error) {
      console.log(error)
    }
  }

  const insertPropertyImageFunc = async (id: number, body: any) => {
    console.log("iddddddddddd", id)
    try {
      let result = await insertPropertyImage(id, body)
    } catch (error) {

    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto py-10"
    >
      <div className="grid md:grid-cols-2 gap-10">

        {/* Property Details */}
        <div className="border rounded-xl p-6 shadow h-[650px] overflow-y-auto">

          <h2 className="text-xl font-semibold mb-6">
            Property Details
          </h2>

          <div className="space-y-5">

            <div>
              <input
                placeholder="Title"
                {...register("title")}
                className="w-full border p-3 rounded"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.title?.message}
              </p>
            </div>

            <div>
              <textarea
                rows={4}
                placeholder="Description"
                {...register("description")}
                className="w-full border p-3 rounded"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.description?.message}
              </p>
            </div>

            <div>
              <select
                {...register("propertyType")}
                className="w-full border p-3 rounded"
              >
                <option value="">
                  Property Type
                </option>

                <option value="Apartment">
                  Apartment
                </option>

                <option value="Villa">
                  Villa
                </option>

                <option value="House">
                  House
                </option>
              </select>

              <p className="text-red-500 text-sm mt-1">
                {errors.propertyType?.message}
              </p>
            </div>

            <div>
              <input
                placeholder="City"
                {...register("city")}
                className="w-full border p-3 rounded"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.city?.message}
              </p>
            </div>

            <div>
              <input
                type="number"
                placeholder="Price"
                {...register("price", {
                  valueAsNumber: true,
                })}
                className="w-full border p-3 rounded"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.price?.message}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">

              <div>
                <input
                  type="number"
                  placeholder="Bedrooms"
                  {...register("bedrooms", {
                    valueAsNumber: true,
                  })}
                  className="w-full border p-3 rounded"
                />

                <p className="text-red-500 text-sm mt-1">
                  {errors.bedrooms?.message}
                </p>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Bathrooms"
                  {...register("bathrooms", {
                    valueAsNumber: true,
                  })}
                  className="w-full border p-3 rounded"
                />

                <p className="text-red-500 text-sm mt-1">
                  {errors.bathrooms?.message}
                </p>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Area Sqft"
                  {...register("areaSqft", {
                    valueAsNumber: true,
                  })}
                  className="w-full border p-3 rounded"
                />

                <p className="text-red-500 text-sm mt-1">
                  {errors.areaSqft?.message}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Image Upload */}
        <div className="border rounded-xl p-6 shadow h-[650px] overflow-y-auto">

          <h2 className="text-xl font-semibold mb-6">
            Property Images
          </h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mb-5"
          />

          <p className="text-red-500 text-sm mb-4">
            {imageError}
          </p>

          <div className="grid grid-cols-2 gap-4">

            {images.map((image, index) => (

              <div
                key={index}
                className="border rounded-lg p-3"
              >

                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="h-40 w-full object-cover rounded"
                />

                <button
                  type="button"
                  onClick={() => {
                    console.log("image", image)
                    setPrimaryImageIndex(index)
                    setPrimaryImage(image)
                  }}
                  className={`w-full mt-3 p-2 rounded text-white ${primaryImageIndex === index
                    ? "bg-green-600"
                    : "bg-blue-600"
                    }`}
                >
                  {primaryImageIndex === index
                    ? "Primary Image"
                    : "Set Primary"}
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

      <button
        type="submit"
        className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg"
      >
        Create Property
      </button>

    </form>
  );
}
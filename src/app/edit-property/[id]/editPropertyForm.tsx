"use client";

import { useEffect, useState } from "react";
import {
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  createPropertySchema,
  CreatePropertyFormData,
} from "@/schema/propertySchema";

import {
  getPropertyById,
  updateProperty,
  insertPropertyImage,
  deleteImageById,
  getPropertyByImageId,
  UpdatePropertyImageById,
  // setPrimaryImage,
} from "@/services/propertyApi";

import {
  uploadMultipleImages,
} from "@/services/uploadApi";

import {
  useParams,
  useRouter,
} from "next/navigation";
import { isPrimary } from "node:cluster";

export default function EditPropertyPage() {

  const params = useParams();

  const router = useRouter();

  const propertyId = Number(params.id);

  const [existingImages, setExistingImages] =
    useState<any[]>([]);
console.log(existingImages)
  const [newImages, setNewImages] =
    useState<File[]>([]);

    console.log(newImages)

  const [imageError, setImageError] =
    useState("");


  const [selectedPrimaryImage, setSelectedPrimaryImage] =
    useState<{
      id?: number | string;
      imageUrl?: string;
    }>({});

  console.log("selectedPrimaryImage", selectedPrimaryImage)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePropertyFormData>({
    resolver: zodResolver(
      createPropertySchema
    ),
  });

  useEffect(() => {
    loadProperty();
    getPropertyImageFunc();
  }, []);

  const loadProperty = async () => {
    try {

      const result =
        await getPropertyById(
          propertyId
        );

      const property =
        result.data;

      reset({
        title: property.title,
        description:
          property.description,
        propertyType:
          property.propertyType,
        city: property.city,
        price: property.price,
        bedrooms:
          property.bedrooms,
        bathrooms:
          property.bathrooms,
        areaSqft:
          property.areaSqft,
        primaryImageUrl:
          property.primaryImageUrl || "",
      });

      // setExistingImages(
      //   property.images || []
      // );

    } catch (error) {
      console.log(error);
    }
  };

  const getPropertyImageFunc = async () => {
    try {
      let result = await getPropertyByImageId(propertyId);
      setExistingImages(result?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) return;

    setNewImages((prev) => [
      ...prev,
      ...Array.from(e.target.files),
    ]);
  };
  const removeNewImage = (
    imageId: string
  ) => {

    const index = Number(
      imageId.replace("new-", "")
    );

    setNewImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  const deleteImageFunc = async (
    imageId: number
  ) => {

    try {

      await deleteImageById(
        imageId
      );

      setExistingImages(
        (prev) =>
          prev.filter(
            (image) =>
              image.id !== imageId
          )
      );

    } catch (error) {
      console.log(error);
    }
  };

  // const makePrimaryFunc = async (
  //   imageId: number
  // ) => {

  //   try {

  //     await setPrimaryImage(
  //       imageId
  //     );

  //     setExistingImages(
  //       (prev) =>
  //         prev.map((image) => ({
  //           ...image,
  //           isPrimary:
  //             image.id === imageId,
  //         }))
  //     );

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit = async (
    data: CreatePropertyFormData
  ) => {
    console.log("onsubmit",data)

    try {

      let primaryImageUrl =
        selectedPrimaryImage.imageUrl ||
        existingImages.find(
          (image) => image.isPrimary
        )?.imageUrl ||
        "";

      // Upload only newly selected images
      if (newImages.length > 0) {

        const uploadResult: any =
          await uploadMultipleImages(
            newImages
          );

        const uploadedImages =
          uploadResult.images.map(
            (
              image: any,
              index: number
            ) => ({
              imageUrl:
                image.url,
              isPrimary:
                selectedPrimaryImage.id ===
                `new-${index}`,
            })
          );

        await insertPropertyImage(
          propertyId,
          uploadedImages
        );

        const newPrimary =
          uploadedImages.find(
            (
              image: any
            ) =>
              image.isPrimary
          );

        if (newPrimary) {
          primaryImageUrl =
            newPrimary.imageUrl;
          console.log(primaryImageUrl)
        }
      }

      await updateProperty(
        propertyId,
        {
          ...data,
          primaryImageUrl,
        }
      );

      if (typeof selectedPrimaryImage?.id == "number")
        await UpdatePropertyImageById(
          selectedPrimaryImage?.id,
          { isPrimary: true }
        );
      router.push(
        "/my-properties"
      );

    } catch (error) {
      console.log(error);
    }
  };

  const allImages = [
    ...existingImages,
    ...newImages.map(
      (file, index) => ({
        id: `new-${index}`,
        imageUrl:
          URL.createObjectURL(file),
        isPrimary: false,
        isNew: true,
      })
    ),
  ];
  return (
 <form
  onSubmit={handleSubmit(
    (data) => {
      console.log("VALID");
      onSubmit(data);
    },
    (errors) => {
      console.log(
        "VALIDATION ERRORS",
        errors
      );
    }
  )}
>
      <div className="grid md:grid-cols-2 gap-10">

        <div className="border rounded-xl p-6 shadow h-[650px] overflow-y-auto">

          <h2 className="text-xl font-semibold mb-6">
            Edit Property
          </h2>

          <div className="space-y-5">

            <input
              placeholder="Title"
              {...register("title")}
              className="w-full border p-3 rounded"
            />

            <p className="text-red-500 text-sm">
              {errors.title?.message}
            </p>

            <textarea
              rows={4}
              placeholder="Description"
              {...register(
                "description"
              )}
              className="w-full border p-3 rounded"
            />

            <select
              {...register(
                "propertyType"
              )}
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

            <input
              placeholder="City"
              {...register("city")}
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Price"
              {...register(
                "price",
                {
                  valueAsNumber: true,
                }
              )}
              className="w-full border p-3 rounded"
            />

            <div className="grid grid-cols-3 gap-4">

              <input
                type="number"
                placeholder="Bedrooms"
                {...register(
                  "bedrooms",
                  {
                    valueAsNumber: true,
                  }
                )}
                className="w-full border p-3 rounded"
              />

              <input
                type="number"
                placeholder="Bathrooms"
                {...register(
                  "bathrooms",
                  {
                    valueAsNumber: true,
                  }
                )}
                className="w-full border p-3 rounded"
              />

              <input
                type="number"
                placeholder="Area Sqft"
                {...register(
                  "areaSqft",
                  {
                    valueAsNumber: true,
                  }
                )}
                className="w-full border p-3 rounded"
              />

            </div>

          </div>

        </div>

        <div className="border rounded-xl p-6 shadow h-[650px] overflow-y-auto">

          <h2 className="text-xl font-semibold mb-6">
            Property Images
          </h2>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-6">
            {allImages.map((image) => (

              <div
                key={image.id}
                className="border rounded-lg p-3"
              >

                <img
                  src={
                    image.imageUrl
                  }
                  className="h-40 w-full object-cover rounded"
                />

                <div className="flex flex-col gap-2 mt-3">

                  <button
                    type="button"
                    onClick={() => {

                      setSelectedPrimaryImage({
                        id: image.id,
                        imageUrl:
                          image.imageUrl,
                      });

                      setExistingImages(
                        (prev) =>
                          prev.map((img) => ({
                            ...img,
                            isPrimary:
                              img.id === image.id,
                          }))
                      );
                    }}
                    className={`w-full py-2 rounded text-white text-sm ${selectedPrimaryImage.id === image.id ||
                      image.isPrimary
                      ? "bg-green-600"
                      : "bg-blue-600"
                      }`}
                  >
                    {selectedPrimaryImage.id === image.id ||
                      image.isPrimary
                      ? "Primary"
                      : "Set Primary"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {

                      if (image.isNew) {
                        removeNewImage(image.id);
                      } else {
                        deleteImageFunc(image.id);
                      }

                    }}
                    className="w-full py-2 rounded bg-red-600 text-white text-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>

            )
            )}

          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={
              handleImageChange
            }
          />

          <p className="text-red-500 mt-2">
            {imageError}
          </p>

        </div>

      </div>

      <button
        type="submit"
        className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg"
      >
        Update Property
      </button>

    </form>
  );
}
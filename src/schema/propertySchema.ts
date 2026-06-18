import { z } from "zod";

export const createPropertySchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters"),

    description: z
        .string()
        .min(10, "Description is required"),

    propertyType: z
        .string()
        .min(1, "Property type is required"),

    city: z
        .string()
        .min(2, "City is required"),

    price: z
        .number({
            error: "Price is required",
        })
        .positive("Price must be positive"),

    bedrooms: z
        .number({
            error: "Bedrooms is required",
        })
        .min(1, "Minimum 1 bedroom"),

    bathrooms: z
        .number({
            error: "Bathrooms is required",
        })
        .min(1, "Minimum 1 bathroom"),

    areaSqft: z
        .number({
            error: "Area is required",
        })
        .positive("Area must be positive"),
    primaryImageUrl: z
        .string()
        .optional(),
});

export type CreatePropertyFormData =
    z.infer<typeof createPropertySchema>;
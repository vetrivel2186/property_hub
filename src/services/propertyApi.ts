import { api } from "./api";

export interface Property {
  id: number;
  userId: number;
  title: string;
  description: string;
  propertyType: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  city?: string;
  propertyType?: string;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc" | "oldest";
  page?: number;
  limit?: number;
}

export interface CreatePropertyPayload {
  title: string;
  description: string;
  propertyType: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  status?: "active" | "inactive";
  primaryImageUrl:string;
}

export interface imageUrl{
    imageUrl:string,
    isPrimary:boolean
}

export interface UpdatePropertyPayload
  extends Partial<CreatePropertyPayload> {}

export const getAllProperties = async (
  filters: PropertyFilters = {}
) => {
  const response = await api.get(
    "/property/getAllProperties",
    {
      params: filters,
    }
  );

  return response.data;
};

export const getPropertyById = async (
  id: number | string
) => {
  const response = await api.get(
    `/property/getProperty/${id}`
  );

  return response.data;
};
export const getPropertyByUserId = async (
) => {
  const response = await api.get(
    `/property/getPropertyByUserId`
  );

  return response.data;
};

export const createProperty = async (
  data: CreatePropertyPayload
) => {
  const response = await api.post(
    "/property/insertProperty",
    data
  );

  return response.data;
};

export const updateProperty = async (
  id: number | string,
  data: UpdatePropertyPayload
) => {
  const response = await api.put(
    `/property/updateProperty/${id}`,
    data
  );

  return response.data;
};

export const deleteProperty = async (
  id: number | string
) => {
  const response = await api.delete(
    `/property/deleteProperty/${id}`
  );

  return response.data;
};

export const getPropertyByImageId = async (
  id: number | string
) => {
  const response = await api.get(
    `/property-images/getPropertyImage/${id}`
  );

  return response.data;
};
export const insertPropertyImage = async (
  id: number | string,data:imageUrl[]
) => {
  const response = await api.post(
    `/property-images/insertPropertyImage/${id}`,
    data
  );

  return response.data;
};

export const deleteImageById = async (
  id: number | string
) => {
  const response = await api.delete(
    `/property-images/deletePropertyImage/${id}`
  );

  return response.data;
};
export const UpdatePropertyImageById = async (
  id: number | string,body:{isPrimary:boolean}
) => {
  const response = await api.put(
    `/property-images/updatePropertyImage/${id}`,body
  );

  return response.data;
};


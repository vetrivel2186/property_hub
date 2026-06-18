import { api } from "./api";


export const createInquiry = async (
  body: {
    propertyId: number;
    name: string;
    email: string;
    message: string;
  }
) => {
  const response = await api.post(
    "/inquiry/insert-inquiry",
    body
  );

  return response.data;
};

export const getReceivedInquiries =
  async () => {
    const response =
      await api.get(
        "/inquiry/received"
      );

    return response.data;
  };

export const getSentInquiries =
  async () => {
    const response =
      await api.get(
        "/inquiry/sent"
      );

    return response.data;
  };
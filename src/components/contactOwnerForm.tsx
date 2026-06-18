"use client";

import { createInquiry } from "@/services/inquiryApi";
import { useState } from "react";

type Props = {
  propertyId: number;
};

export default function ContactOwnerForm({
  propertyId,
}: Props) {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      message: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {

      setLoading(true);

      await createInquiry({
        propertyId,
        name: formData.name,
        email: formData.email,
        message:
          formData.message,
      });

      setSuccessMessage(
        "Inquiry sent successfully"
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error: any) {

      setErrorMessage(
        error?.response?.data
          ?.message ||
          "Failed to send inquiry"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="font-bold text-2xl mb-5">
        Contact Owner
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          rows={5}
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        {successMessage && (
          <p className="text-green-600 text-sm">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="text-red-600 text-sm">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded w-full disabled:opacity-50"
        >
          {loading
            ? "Sending..."
            : "Send Inquiry"}
        </button>

      </form>

    </div>
  );
}
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/schema/registerSchema";
import { registerUser } from "@/services/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";


export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      setIsLoading(true);
      const response = await registerUser(body);
      Cookies.set("accessToken", response.accessToken, {
        expires: 1, // 1 day
      });

      Cookies.set("refreshToken", response.refreshToken, {
        expires: 7,
      });
      localStorage.setItem("loginUser", JSON.stringify(response.user))
      router.push("/properties");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <input
        type="text"
        placeholder="Name"
        {...register("name")}
        className="w-full border p-3 rounded bg-indigo-50"
      />

      <p className="text-red-500 text-sm">
        {errors.name?.message}
      </p>

      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full border p-3 rounded bg-indigo-50"
      />

      <p className="text-red-500 text-sm">
        {errors.email?.message}
      </p>

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="w-full border p-3 rounded bg-indigo-50"
      />

      <p className="text-red-500 text-sm">
        {errors.password?.message}
      </p>

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        className="w-full border p-3 rounded bg-indigo-50"
      />

      <p className="text-red-500 text-sm">
        {errors.confirmPassword?.message}
      </p>

      <button className="bg-blue-600 text-white p-3 rounded w-full cursor-pointer">
        Register
      </button>
    </form>
  );
}
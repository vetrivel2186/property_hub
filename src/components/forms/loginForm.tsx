"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schema/loginSchema";
import { loginUser } from "@/services/authApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";



export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
 try {
    setIsLoading(true);

    const response = await loginUser(data);
   console.log("response",response)
    Cookies.set("accessToken", response.accessToken, {
      expires: 1, // 1 day
    });

  Cookies.set("refreshToken", response.refreshToken, {
      expires: 7,
    });
    localStorage.setItem("loginUser",JSON.stringify(response.user))

    router.push("/properties");
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border p-3 rounded"
        />

        <p className="text-red-500 text-sm">
          {errors.email?.message}
        </p>
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border p-3 rounded"
        />

        <p className="text-red-500 text-sm">
          {errors.password?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white w-full p-3 rounded disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
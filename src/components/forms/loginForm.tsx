"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schema/loginSchema";



export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
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
        className="bg-blue-600 text-white w-full p-3 rounded"
      >
        Login
      </button>
    </form>
  );
}
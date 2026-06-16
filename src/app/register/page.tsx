import RegisterForm from "@/components/forms/registerForm";

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-20 ">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Create Account
      </h1>

      <RegisterForm />
    </div>
  );
} 
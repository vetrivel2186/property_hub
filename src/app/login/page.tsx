import LoginForm from "@/components/forms/loginForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Login
      </h1>

      <LoginForm />
    </div>
  );
}
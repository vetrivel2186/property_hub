import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-32">
      <h1 className="text-5xl font-bold">
        404
      </h1>

      <p className="mt-4">
        Page not found
      </p>

      <Link
        href="/"
        className="text-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
}
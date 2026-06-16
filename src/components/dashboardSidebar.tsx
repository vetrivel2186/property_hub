import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="font-bold text-2xl mb-6">
        Dashboard
      </h2>

      <div className="space-y-4">

        <Link
          href="/dashboard"
          className="block"
        >
          Overview
        </Link>

        <Link
          href="/my-properties"
          className="block"
        >
          My Properties
        </Link>

        <Link
          href="/create-property"
          className="block"
        >
          Create Property
        </Link>

      </div>

    </div>
  );
}
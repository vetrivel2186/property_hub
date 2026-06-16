import DashboardSidebar from "@/components/dashboardSidebar";

export default function DashboardPage() {
  return (
    <div className="grid md:grid-cols-4 gap-8">

      <DashboardSidebar />

      <div className="md:col-span-3">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white shadow rounded-xl p-6">
            <h2>Total Properties</h2>

            <p className="text-4xl font-bold mt-3">
              10
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2>Total Inquiries</h2>

            <p className="text-4xl font-bold mt-3">
              24
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
import PropertyForm from "./editPropertyForm";

export default function EditPropertyPage() {
  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Edit Property
      </h1>

      <PropertyForm />

    </div>
  );
}
import PropertyForm from "@/components/propertyForm";

export default function CreatePropertyPage() {
  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Create Property
      </h1>

      <PropertyForm />

    </div>
  );
}
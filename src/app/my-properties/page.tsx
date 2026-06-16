import { properties } from "@/data/properties";
import MyPropertyCard from "@/components/myPropertyCard";

export default function MyPropertiesPage() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        My Properties
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {properties.map((property) => (
          <MyPropertyCard
            key={property.id}
            property={property}
          />
        ))}

      </div>

    </div>
  );
}
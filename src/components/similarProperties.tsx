import { properties } from "@/data/properties";
import PropertyCard from "./propertyCard";

export default function SimilarProperties() {
  return (
    <div>

      <h2 className="text-3xl font-bold mb-8">
        Similar Properties
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}

      </div>

    </div>
  );
}
import { Property } from "@/types/property";

interface Props {
  property: Property;
}

export default function PropertyInfo({
  property,
}: Props) {
  return (
    <div className="space-y-5">

      <h1 className="text-4xl font-bold">
        {property.title}
      </h1>

      <p className="text-gray-500">
        {property.location}, {property.city}
      </p>

      <h2 className="text-3xl text-blue-600 font-bold">
        ₹{property.price.toLocaleString()}
      </h2>

      <div className="flex gap-6">
        <p>{property.bedrooms} Bedrooms</p>
        <p>{property.bathrooms} Bathrooms</p>
        <p>{property.areaSqft} sqft</p>
      </div>

      <p className="text-gray-700">
        {property.description}
      </p>

    </div>
  );
}
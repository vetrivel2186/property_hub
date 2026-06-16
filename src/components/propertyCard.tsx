import { Property } from "@/types/property";

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
      {/* <img
        src={property.imageUrl}
        alt={property.title}
        className="h-52 w-full object-cover"
      /> */}

      <div className="p-4 space-y-2">
        <h2 className="font-bold text-xl">
          {property.title}
        </h2>

        <p className="text-gray-500">
          {property.location}, {property.city}
        </p>

        <p className="text-blue-600 font-bold text-xl">
          ₹{property.price.toLocaleString()}
        </p>

        <div className="flex gap-4 text-sm text-gray-600">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.areaSqft} sqft</span>
        </div>
      </div>
    </div>
  );
}
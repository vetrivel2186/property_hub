import Link from "next/link";
import { Property } from "@/types/property";
import { deleteProperty } from "@/services/propertyApi";
import { useRouter } from "next/navigation";

interface Props {
  property: Property;
  propertListFunc:Function
}

export default function MyPropertyCard({
  property,
  propertListFunc
}: Props) {
  const router = useRouter();

  const deletePropertyFunc = async () => {
     await deleteProperty(property.id)
     propertListFunc()
  }
  return (
    <div onClick={()=>{router.push(`/my-properties/${property.id}`)}} className="bg-white shadow-2xl rounded-xl p-6">

      <img
        src={property.primaryImageUrl}
        alt={property.title}
        className="h-52 w-full object-cover"
      />

      <h2 className="font-bold text-xl">
        {property.title}
      </h2>

      <p className="text-gray-500">
        {property.location}
      </p>
      <p className="text-gray-500">
        {property.city}
      </p>

      <p className="text-blue-600 font-bold text-xl">
        ₹{property.price.toLocaleString()}
      </p>

      <div className="flex gap-4 text-sm text-gray-600">
        <span>{property.bedrooms} Beds</span>
        <span>{property.bathrooms} Baths</span>
        <span>{property.areaSqft} sqft</span>
      </div>

      <div className="flex gap-4 mt-5">

        <Link
          href={`/edit-property/${property.id}`}
          onClick={(e) => e.stopPropagation()}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <button onClick={(e)=>{e.stopPropagation();deletePropertyFunc()}} className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>

      </div>

    </div>
  );
}
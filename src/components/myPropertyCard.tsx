import Link from "next/link";
import { Property } from "@/types/property";

interface Props {
  property: Property;
}

export default function MyPropertyCard({
  property,
}: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="font-bold text-xl">
        {property.title}
      </h2>

      <p className="mt-2">
        ₹{property.price.toLocaleString()}
      </p>

      <div className="flex gap-4 mt-5">

        <Link
          href={`/edit-property/${property.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>

      </div>

    </div>
  );
}
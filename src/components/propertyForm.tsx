"use client";

export default function PropertyForm() {
  return (
    <form className="space-y-5">

      <input
        placeholder="Title"
        className="w-full border p-3 rounded"
      />

      <textarea
        placeholder="Description"
        rows={5}
        className="w-full border p-3 rounded"
      />

      <input
        placeholder="City"
        className="w-full border p-3 rounded"
      />

      <input
        placeholder="Location"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        className="w-full border p-3 rounded"
      />

      <select className="w-full border p-3 rounded">

        <option>Apartment</option>
        <option>Villa</option>
        <option>House</option>

      </select>

      <input
        type="number"
        placeholder="Bedrooms"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        placeholder="Bathrooms"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        placeholder="Area (sqft)"
        className="w-full border p-3 rounded"
      />

      <button className="bg-blue-600 text-white p-3 rounded">
        Save Property
      </button>

    </form>
  );
}
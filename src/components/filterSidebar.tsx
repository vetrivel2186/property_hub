export default function FilterSidebar() {
  return (
    <div className="space-y-4">

      <select className="w-full border p-3 rounded">
        <option>Property Type</option>
        <option>Apartment</option>
        <option>Villa</option>
        <option>House</option>
      </select>

      <select className="w-full border p-3 rounded">
        <option>Bedrooms</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      <input
        type="number"
        placeholder="Minimum Budget"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        placeholder="Maximum Budget"
        className="w-full border p-3 rounded"
      />
    </div>
  );
}
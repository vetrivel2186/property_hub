"use client";

interface FilterSidebarProps {
  propertyType: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;

  onPropertyTypeChange: (
    value: string
  ) => void;

  onBedroomsChange: (
    value: string
  ) => void;

  onMinPriceChange: (
    value: string
  ) => void;

  onMaxPriceChange: (
    value: string
  ) => void;
}

export default function FilterSidebar({
  propertyType,
  bedrooms,
  minPrice,
  maxPrice,
  onPropertyTypeChange,
  onBedroomsChange,
  onMinPriceChange,
  onMaxPriceChange,
}: FilterSidebarProps) {
  return (
    <div className="space-y-4">

      <select value={propertyType}
        onChange={(e) =>
          onPropertyTypeChange(
            e.target.value
          )
        }
        className="w-full border p-3 rounded"
      >
        <option value="">Property Type</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
        <option value="house">House</option>
      </select>

      <select value={bedrooms}
        onChange={(e) => onBedroomsChange(e.target.value)}
        className="w-full border p-3 rounded"
      ><option value="">Bedrooms</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>

      <input
        type="number"
        placeholder="Minimum Budget"
        value={minPrice}
        onChange={(e) =>
          onMinPriceChange(
            e.target.value
          )
        }
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        placeholder="Maximum Budget"
        value={maxPrice}
        onChange={(e) =>
          onMaxPriceChange(
            e.target.value
          )
        }
        className="w-full border p-3 rounded"
      />

    </div>
  );
}
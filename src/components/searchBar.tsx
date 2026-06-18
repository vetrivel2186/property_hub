"use client";

interface SearchBarProps {
  city: string;
  onCityChange: (
    city: string
  ) => void;
}

export default function SearchBar({
  city,
  onCityChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search by city..."
      value={city}
      onChange={(e) =>
        onCityChange(e.target.value)
      }
      className="flex-4 w-full h-13 border p-3 rounded"
    />
  );
}
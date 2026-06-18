"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/searchBar";
import FilterSidebar from "@/components/filterSidebar";
import PropertyCard from "@/components/propertyCard";
import Pagination from "@/components/pagination";
import { getAllProperties } from "@/services/propertyApi";
import { Property } from "@/types/property";
import { useRouter } from "next/navigation";


export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);

  const [city, setCity] = useState("");

  const [propertyType, setPropertyType] =
    useState("");

  const [bedrooms, setBedrooms] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {
    fetchProperties();
  }, [
    city,
    propertyType,
    bedrooms,
    minPrice,
    maxPrice,
    page,
  ]);

  async function fetchProperties() {
    try {
      const response =
        await getAllProperties({
          city,
          propertyType,
          bedrooms: bedrooms
            ? Number(bedrooms)
            : undefined,
          minPrice: minPrice
            ? Number(minPrice)
            : undefined,
          maxPrice: maxPrice
            ? Number(maxPrice)
            : undefined,
          page,
          limit: 9,
        });

      setProperties(response.data.data);

      setTotalPages(
        response.data.pagination.totalPages
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

     <div className="flex gap-8 items-center justify-center">
       <SearchBar
        city={city}
        onCityChange={setCity}
      />
      <button onClick={()=>{router.push("/create-property")}} className="flex-1 h-13 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
>Add Property</button>
     </div>

      <div className="grid md:grid-cols-4 gap-8 mt-8">

        <div>
          <FilterSidebar
            propertyType={propertyType}
            bedrooms={bedrooms}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPropertyTypeChange={
              setPropertyType
            }
            onBedroomsChange={setBedrooms}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </div>

        <div className="md:col-span-3">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}

          </div>

{
  properties.length > 0 ? 
  <Pagination
    currentPage={page}
    totalPages={totalPages}
    onPageChange={setPage}
  /> :<p className="flex justify-center gap-4 mt-40 text-bold">No data found</p>
}

        </div>

      </div>
    </div>
  );
}
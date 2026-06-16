
import FilterSidebar from "@/components/filterSidebar";
import Pagination from "@/components/pagination";
import PropertyCard from "@/components/propertyCard";
import SearchBar from "@/components/searchBar";
import { properties } from "@/data/properties";

export default function PropertiesPage() {
  return (
    <div>

      <SearchBar />

      <div className="grid md:grid-cols-4 gap-8 mt-8">

        <div>
          <FilterSidebar />
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

          <Pagination />

        </div>

      </div>

    </div>
  );
}
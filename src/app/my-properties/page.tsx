'use client';
import MyPropertyCard from "@/components/myPropertyCard";
import { useEffect, useState } from "react";
import { Property } from "@/types/property";
import { getPropertyByUserId } from "@/services/propertyApi";

export default function MyPropertiesPage() {
  const [properties,setProperties] = useState<Property[]>([])
  const getPropertyByUserIdFunc =async()=>{
    try {
      let result = await getPropertyByUserId();
    console.log(result)
    setProperties(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
      getPropertyByUserIdFunc();
  },[])
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        My Properties
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {properties.map((property) => (
          <MyPropertyCard
            key={property.id}
            property={property}
            propertListFunc = {()=>getPropertyByUserIdFunc()}
          />
        ))}

      </div>

    </div>
  );
}
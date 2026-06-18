'use client';
import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import PropertyGallery from "@/components/propertyGallery";
import PropertyInfo from "@/components/propertyInfo";
import ContactOwnerForm from "@/components/contactOwnerForm";
import { useEffect, useState } from "react";
import { ImageInterface, Property } from "@/types/property";
import { getPropertyById, getPropertyByImageId } from "@/services/propertyApi";
// import SimilarProperties from "@/components/similarproperties";

export default function MyPropertyDetails({
    id,
}: {
    id: string;
}) {
    const [property, setProperty] = useState<Property>({} as Property)
    const [propertyImages, setPropertyImages] = useState<ImageInterface[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const getPropertyFunc = async () => {
        try {
            let result = await getPropertyById(id)
            console.log("result", result)
            setProperty(result?.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getImagesBypropertyIdFunc = async () => {
        try {
            let result = await getPropertyByImageId(id);
            setPropertyImages(result?.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPropertyFunc();
        getImagesBypropertyIdFunc();
    }, [])

    if (!properties) {
        notFound();
    }

    return (
        <div className="space-y-10">
            {/* {
                propertyImages.length > 0 ? */}
                    <PropertyGallery propertyImages={propertyImages} /> 
            {/* } */}

            <div className="grid md:grid-cols-3 gap-10">

                <div className="md:col-span-2">
                    <PropertyInfo property={property} />
                </div>
            </div>

            {/* <SimilarProperties /> */}

        </div>
    );
}
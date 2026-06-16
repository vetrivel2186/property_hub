import { notFound } from "next/navigation";


import { properties } from "@/data/properties";
import PropertyGallery from "@/components/propertyGallery";
import PropertyInfo from "@/components/propertyInfo";
import ContactOwnerForm from "@/components/contactOwnerForm";
// import SimilarProperties from "@/components/similarproperties";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const property = properties.find(
    (p) => p.id === id
  );

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-10">

      <PropertyGallery
        images={property.imageUrls}
      />

      <div className="grid md:grid-cols-3 gap-10">

        <div className="md:col-span-2">
          <PropertyInfo property={property} />
        </div>

        <div>
          <ContactOwnerForm />
        </div>

      </div>

      {/* <SimilarProperties /> */}

    </div>
  );
}
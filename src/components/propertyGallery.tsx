import { ImageInterface } from "@/types/property";

type PropertyGalleryProps = {
  propertyImages: ImageInterface[];
};

export default function PropertyGallery({ propertyImages }: PropertyGalleryProps) {
  const primary:any = propertyImages.find(
    (property) => property.isPrimary
  );

  const secondaryImages = propertyImages.filter(
    (property) => !property.isPrimary
  );
  return (
    <div className="grid md:grid-cols-2 gap-4">

      <img
        src={primary?.imageUrl}
        className="rounded-xl h-96 w-full object-cover"
      />

      <div className="grid grid-cols-2 gap-4">

        {secondaryImages.map((property: ImageInterface) => (
          <img
            key={property.id}
            src={property?.imageUrl}
            className="rounded-xl h-44 w-full object-cover"
          />
        ))}

      </div>
    </div>
  );
}
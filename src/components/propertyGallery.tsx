interface Props {
  images: string[];
}

export default function PropertyGallery({
  images,
}: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-4">

      <img
        src={images[0]}
        className="rounded-xl h-96 w-full object-cover"
      />

      <div className="grid grid-cols-2 gap-4">

        {images.slice(1).map((image) => (
          <img
            key={image}
            src={image}
            className="rounded-xl h-44 w-full object-cover"
          />
        ))}

      </div>
    </div>
  );
}
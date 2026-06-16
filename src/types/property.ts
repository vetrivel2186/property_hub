// export interface Property {
//   id: string;
//   title: string;
//   description: string;
//   city: string;
//   location: string;
//   price: number;
//   propertyType: string;
//   bedrooms: number;
//   bathrooms: number;
//   areaSqft: number;
//   imageUrl: string;
// }

export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  location: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;

  imageUrls: string[];
}
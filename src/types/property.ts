
export interface Property {
  id: number;
  title: string;
  description: string;
  city: string;
  location: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  primaryImageUrl:string;
}

export interface ImageInterface {
  id:number,
  propertyId:number,
  imageUrl: string,
  isPrimary:boolean,
  createdAt:string
}
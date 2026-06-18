import MyPropertyDetails from "./myPropertyDetails";


export default async function MyPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return <MyPropertyDetails id={id} />;
}
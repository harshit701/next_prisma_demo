export default function ProductDetails({ params }: { params: { id: string } }) {
  return <h1>Here is the product Id: {params.id}</h1>;
}

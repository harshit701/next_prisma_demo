export default function ProductDetailsSlug({
  params,
}: {
  params: { slug: string };
}) {
  return <h1>Catch all params: {params.slug}</h1>;
}

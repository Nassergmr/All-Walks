import SingleProduct from "@/components/shopComponents/singleProduct/singleProduct";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <SingleProduct id={params.id} />
    </div>
  );
}

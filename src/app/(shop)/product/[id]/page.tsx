import SingleProduct from "@/components/shopComponents/singleProduct/singleProduct";

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Params) {
  return (
    <div>
      <SingleProduct id={params.id} />
    </div>
  );
}

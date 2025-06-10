import ProductsPageBanner from "@/components/elements/productsPageBanner";
import MenProductsByBrand from "@/components/shopComponents/menProducts/menProductsByBrand";

export default async function Page({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;

  return (
    <div>
      <ProductsPageBanner
        imgSrc="/images/banners/four-man-leaning-on-wall.jpg"
        title="Men's Sneakers Collection"
        paragraph="Browse our curated collection of the best men's sneakers. From timeless classics to the latest designs, find your perfect pair here!"
      />
      <MenProductsByBrand brand={brand} />
    </div>
  );
}

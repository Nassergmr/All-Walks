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
        imgSrcSm="/images/banners_small_screen/pexels-obviouslyarthur-1102777.jpg"
        imgSrc="/images/banners/four-man-leaning-on-wall.jpg"
        title="Men's Sneakers Collection"
        paragraph="Browse our curated collection of the best men's sneakers. From timeless classics to the latest designs, find your perfect pair here!"
      />
      <MenProductsByBrand brand={brand} />
    </div>
  );
}

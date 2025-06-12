import ProductsPageBanner from "@/components/elements/productsPageBanner";
// import MenProductsByBrand from "@/components/shopComponents/menProducts/menProductsByBrand";
import WomenProductsByBrand from "@/components/shopComponents/womenProducts/womenProductsByBrand";

export default async function Page({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  return (
    <div>
      <ProductsPageBanner
        imgSrcSm="/images/banners_small_screen/pexels-madsdonald-1615748.jpg"
        imgSrc="/images/banners/pexels-tima-miroshnichenko-7202825 (1).jpg"
        title="Women's Sneakers Collection"
        paragraph="Discover our exclusive selection of women's sneakers. From stylish essentials to the latest trends, find the perfect pair to elevate your look!"
      />
      <WomenProductsByBrand brand={brand} />
    </div>
  );
}

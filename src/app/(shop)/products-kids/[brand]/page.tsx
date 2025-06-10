import ProductsPageBanner from "@/components/elements/productsPageBanner";
import KidsProductsByBrands from "@/components/shopComponents/kidsProducts/kidsProductsByBrand";

export default async function Page({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  return (
    <div>
      <ProductsPageBanner
        imgSrc="/images/banners/kids-sneakers-banner-2.jpg"
        title="Kids' Sneakers Collection"
        paragraph="Explore our vibrant and durable kids' sneakers. Designed for fun, comfort, and endless adventures—perfect for every little step!"
      />

      <KidsProductsByBrands brand={brand} />
    </div>
  );
}

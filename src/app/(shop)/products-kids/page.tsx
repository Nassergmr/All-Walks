import ProductsPageBanner from "@/components/elements/productsPageBanner";
import KidsProducts from "@/components/shopComponents/kidsProducts/kidsProducts";

const Page: React.FC = () => {
  return (
    <div>
      <ProductsPageBanner
        imgSrc="/images/banners/kids-sneakers-banner-2.jpg"
        title="Kids' Sneakers Collection"
        paragraph="Explore our vibrant and durable kids' sneakers. Designed for fun, comfort, and endless adventures—perfect for every little step!"
      />

      <KidsProducts />
    </div>
  );
};

export default Page;

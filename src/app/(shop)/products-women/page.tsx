import WomenProducts from "@/components/shopComponents/womenProducts/womenProducts";
import ProductsPageBanner from "@/components/elements/productsPageBanner";

const Page: React.FC = () => {
  return (
    <div>
      <ProductsPageBanner
        imgSrc="/images/banners/pexels-tima-miroshnichenko-7202825 (1).jpg"
        title="Women's Sneakers Collection"
        paragraph="Discover our exclusive selection of women's sneakers. From stylish essentials to the latest trends, find the perfect pair to elevate your look!"
      />
      <WomenProducts />
    </div>
  );
};

export default Page;

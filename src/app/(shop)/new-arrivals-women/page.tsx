import ProductsPageBanner from "@/components/elements/productsPageBanner";
import NewArrivalsWomen from "@/components/shopComponents/newArrivalsProducts/newArrivalsWomen";

const Page: React.FC = () => {
  return (
    <div>
      <ProductsPageBanner
        imgSrcSm="/images/banners_small_screen/pexels-madsdonald-1615748.jpg"
        imgSrc="/images/banners/pexels-mart-production-7880120.jpg"
        title="New Arrivals"
        paragraph="Discover the newest styles and exclusive colorways—available here for a limited time only."
      />
      <NewArrivalsWomen />
    </div>
  );
};

export default Page;

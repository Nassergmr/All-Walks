import ProductsPageBanner from "@/components/elements/productsPageBanner";
import NewArrivalsMen from "@/components/shopComponents/newArrivalsProducts/newArrivalsMen";

const Page: React.FC = () => {
  return (
    <div>
      <ProductsPageBanner
        imgSrc="/images/banners/pexels-mart-production-7880120 (1).jpg"
        title="New Arrivals"
        paragraph="Discover the newest styles and exclusive colorways—available here for a limited time only."
      />
      <NewArrivalsMen />
    </div>
  );
};

export default Page;

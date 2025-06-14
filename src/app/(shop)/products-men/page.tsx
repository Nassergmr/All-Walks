import ProductsPageBanner from "@/components/elements/productsPageBanner";
import MenProducts from "@/components/shopComponents/menProducts/menProducts";

const Page: React.FC = () => {
  return (
    <div>
      <ProductsPageBanner
        imgSrcSm="/images/banners_small_screen/pexels-ralph-rabago-3214701.jpg"
        imgSrc="/images/banners/four-man-leaning-on-wall.jpg"
        title="Men's Sneakers Collection"
        paragraph="Browse our curated collection of the best men's sneakers. From timeless classics to the latest designs, find your perfect pair here!"
      />

      <MenProducts />
    </div>
  );
};

export default Page;

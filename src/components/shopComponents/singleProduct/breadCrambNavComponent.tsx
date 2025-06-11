import BreadcrumbNav from "@/components/elements/breadCrumbNave";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/types";

type BreadCrambNavComponentProps = {
  productInfo: Product;
};
const BreadCrambNavComponent: React.FC<BreadCrambNavComponentProps> = ({
  productInfo,
}) => {
  return (
    <BreadcrumbNav
      items={[
        { label: "Home", href: "/" },
        {
          label: productInfo.gender ? (
            productInfo.gender === "men" ? (
              "Men’s Sneakers"
            ) : productInfo.gender === "women" ? (
              "Women’s Sneakers"
            ) : (
              "Kids’s Sneakers"
            )
          ) : (
            <Skeleton className="w-[100px] h-[20px]" />
          ),
          href:
            productInfo.gender === "men"
              ? "/products-men"
              : productInfo.gender === "women"
              ? "/products-women"
              : "/products-kids",
        },
        {
          label: productInfo.brand ? (
            productInfo.brand
          ) : (
            <Skeleton className="w-[100px] h-[20px]" />
          ),
          href:
            productInfo.gender === "men"
              ? `/products-men/${productInfo.brand}`
              : productInfo.gender === "women"
              ? `/products-women/${productInfo.brand}`
              : `/products-kids/${productInfo.brand}`,
        },
        {
          label: productInfo.title ? (
            productInfo.title
          ) : (
            <Skeleton className="w-[300px] h-[30px]" />
          ),
        },
      ]}
    />
  );
};

export default BreadCrambNavComponent;

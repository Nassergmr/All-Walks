import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface emptyCartProps {
  setOpenDrawer: (value: boolean) => void;
}

const EmptyCart: React.FC<emptyCartProps> = ({ setOpenDrawer }) => {
  return (
    <div
      id="empty_cart_container"
      className="flex flex-col gap-4 mb-9 items-center px-3"
    >
      <Image
        src="/images/icons/no-products.png"
        alt=""
        width={300}
        height={300}
      />
      <Link
        onClick={() => setOpenDrawer(false)}
        href="/products-men"
        className="w-[70%]"
      >
        <Button className="  w-full" variant={"outline"} size="lg">
          Shop Men&apos;s
        </Button>
      </Link>

      <Link
        onClick={() => setOpenDrawer(false)}
        href="/products-women"
        className="w-[70%]"
      >
        <Button className=" w-full" variant={"outline"} size="lg">
          Shop Women&apos;s
        </Button>
      </Link>

      <Link
        onClick={() => setOpenDrawer(false)}
        href="/products-kids"
        className="w-[70%]"
      >
        <Button className=" w-full" variant={"outline"} size="lg">
          Shop Kids
        </Button>
      </Link>

      <Link
        onClick={() => setOpenDrawer(false)}
        href="/new-arrivals-men"
        className="w-[70%]"
      >
        <Button className=" w-full" variant={"outline"} size="lg">
          New Arrivals
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;

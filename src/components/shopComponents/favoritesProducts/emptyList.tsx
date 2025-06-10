import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EmptyList: React.FC = () => {
  return (
    <div id="empty_list" className=" w-full flex  flex-col items-center">
      <Image
        width={300}
        height={300}
        src="/images/icons/no-favorites.png"
        alt=""
        className="mx-auto"
      />

      <div
        id="buttons_container"
        className="grid sm:grid-cols-4 gap-5 grid-cols-2 "
      >
        <Link href="/products-men" className="w-full">
          <Button className="  w-full" variant={"outline"} size="lg">
            Shop Men&apos;s
          </Button>
        </Link>

        <Link href="/products-women" className="w-full">
          <Button className=" w-full" variant={"outline"} size="lg">
            Shop Women&apos;s
          </Button>
        </Link>

        <Link href="/products-kids" className="w-full">
          <Button className=" w-full" variant={"outline"} size="lg">
            Shop Kids
          </Button>
        </Link>

        <Link href="/new-arrivals-men" className="w-full">
          <Button className=" w-full" variant={"outline"} size="lg">
            New Arrivals
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyList;

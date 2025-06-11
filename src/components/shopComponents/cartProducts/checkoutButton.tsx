import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ButtonProps = {
  children?: React.ReactNode;
  Icon?: React.ReactNode;
  favoritesItems?: unknown[]; // or your actual type
  cartQuantity?: number;
} & React.ComponentProps<typeof Button>;

//======================================
export const CheckoutButton = ({
  children,
  Icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>
  ),
  ...rest
}: ButtonProps) => {
  return (
    <Button
      size={"lg"}
      variant={"outline"}
      {...rest}
      className={cn("relative w-full overflow-hidden border shadow group")}
    >
      <span className="absolute inset-0 rounded-sm flex items-center justify-center size-full duration-700 ease-[cubic-bezier(0.50,0.20,0,1)] -translate-x-full group-hover:translate-x-0">
        {Icon}
      </span>
      <span className="absolute flex items-center justify-center w-full h-full transition-all duration-500 ease-out transform group-hover:translate-x-full ">
        proceed to checkout
      </span>
      <span className="relative">{children}</span>
    </Button>
  );
};

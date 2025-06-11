import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ButtonProps = {
  children?: React.ReactNode;
  Icon?: React.ReactNode;
  text: string;
  favoritesItems?: unknown[]; // or your actual type
  cartQuantity?: number;
} & React.ComponentProps<typeof Button>;

//======================================
export const EmptyButton = ({
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
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  ),
  text,
  favoritesItems = [],
  cartQuantity = 0,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      variant={"outline"}
      {...rest}
      className={cn(
        `${
          favoritesItems.length > 0 || cartQuantity > 0 ? "block" : "hidden"
        } relative w-[104px] overflow-hidden border shadow group`
      )}
    >
      <span className="absolute inset-0 rounded-sm flex items-center justify-center size-full duration-700 ease-[cubic-bezier(0.50,0.20,0,1)] -translate-x-full group-hover:translate-x-0">
        {Icon}
      </span>
      <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-all duration-500 ease-out transform group-hover:translate-x-full ">
        {text}
      </span>
      <span className="relative">{children}</span>
    </Button>
  );
};

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ButtonMainProps {
  label: string;
  href: string;
}

const ButtonMain: React.FC<ButtonMainProps> = ({ label, href }) => {
  return (
    <Link href={href} className="">
      <Button
        className="hover:bg-black rounded-full italic bg-white text-black transition-all duration-300 ease-in-out hover:text-white border-none"
        size="default"
        variant="outline"
      >
        {label}
      </Button>
    </Link>
  );
};

export default ButtonMain;

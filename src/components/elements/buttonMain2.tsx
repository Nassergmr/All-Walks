import Link from "next/link";

interface ButtonMainProps {
  label: string;
  href: string;
}

const ButtonMain2: React.FC<ButtonMainProps> = ({ label, href }) => {
  return (
    <Link href={href} className="w-fit mx-auto">
      <button className=" hover:bg-white uppercase text-white hover:text-black bg-none transition-all duration-300 ease-in-out text-sm font-medium  rounded-full border border-white px-4.5 py-1.5">
        {label}
      </button>
    </Link>
  );
};

export default ButtonMain2;

// "use client";

import TextLoop from "../elements/textLoop";
// import { usePathname } from "next/navigation";

const TopNaveBar: React.FC = () => {
  //   const path = usePathname();

  //   if (path !== "/") {
  //     return null;
  //   }

  return (
    <div
      id="top-navebar"
      className={`w-full fixed z-10 top-0 left-0 h-[40px] flex items-center justify-center py-2 bg-[#39523f]`}
    >
      <div className="text-[12px] text-white font-semibold w-fit">
        <TextLoop />
      </div>
    </div>
  );
};

export default TopNaveBar;

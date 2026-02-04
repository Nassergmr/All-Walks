import TextLoop from "../elements/textLoop";

interface Props {
  visible: boolean;
  isScrolled: boolean;
}

const TopNaveBar: React.FC<Props> = ({ visible, isScrolled }) => {
  return (
    <div
      id="top-navebar"
      className={`${visible && isScrolled ? " bg-black" : " bg-none"} h-[30px] transition-colors duration-300 w-full fixed z-10 top-0 left-0 flex items-center justify-center py-2 `}
    >
      <div className="text-[12px] text-white w-fit">
        <TextLoop />
      </div>
    </div>
  );
};

export default TopNaveBar;

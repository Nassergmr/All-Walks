const Section8: React.FC = () => {
  return (
    <div className="container sm:my-[4rem] my-[2rem] ">
      <h1 className="sm:text-4xl text-2xl sm:mb-[2rem] mb-[1rem] font-bold">
        The Allwalks Approach
      </h1>
      <div
        id="content_container"
        className="flex md:flex-row flex-col justify-between gap-5"
      >
        <div className="flex flex-col">
          <h2 className="sm:text-xl text-lg font-bold pb-2">
            All-Day Performance
          </h2>
          <p className="text-sm font-normal">
            Built for comfort, power, and motion—Jordan sneakers bring legendary
            support to your everyday game. Whether you’re hitting the streets or
            the hardwood, stay laced in and ready for anything.
          </p>
        </div>

        <div className="flex flex-col">
          <h2 className="sm:text-xl text-lg font-bold pb-2">
            Legacy With Purpose
          </h2>
          <p className="text-sm font-normal">
            Inspired by greatness and made for the future. Every Jordan step
            reflects a legacy of impact—blending iconic style with
            forward-thinking responsibility.
          </p>
        </div>

        <div className="flex flex-col">
          <h2 className="sm:text-xl text-lg font-bold pb-2">
            Materials That Move
          </h2>
          <p className="text-sm font-normal">
            From premium leather to engineered textiles, Jordans are crafted to
            perform. Bold looks meet breathable, flexible builds that feel as
            good as they look—style and substance, all in one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section8;

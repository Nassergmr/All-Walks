const Page: React.FC = () => {
  return (
    <div>
      <div className="container sm:py-[150px] py-[100px] sm:mt-[3rem] sm:mb-[4rem] mt-[7rem] mb-[2rem] text-white bg-[#212121]">
        <h1 className="sm:text-5xl text-3xl  text-center mb-10 font-bold">
          How Can We Help?
        </h1>
        <div
          id="content_container"
          className="flex flex-col gap-1 items-center justify-center"
        >
          <p>Send us a text: 1-814-251-9966</p>
          <p>Give us a call: 1-888-963-8944</p>
          <p>Monday - Friday: 5AM - 5PM PST</p>
        </div>
      </div>
    </div>
  );
};

export default Page;

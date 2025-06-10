import Lottie from "lottie-react";
import lottieAnimation from "../../animations/lottieAnimation.json";

const LottieLoader: React.FC = () => {
  return (
    <Lottie
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[300px]"
      animationData={lottieAnimation}
    />
  );
};

export default LottieLoader;

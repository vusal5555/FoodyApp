import banner from "../assets/man-having-his-meal.svg";
import { AiOutlineArrowDown } from "react-icons/ai";

const Hero = () => {
  return (
    <div>
      <div className="max-w-[80%] mx-auto grid lg:grid-cols-2 items-center my-5">
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl text-red-500 font-bold mb-5">
            Do you crave delicious food?
          </h1>
          <h2 className="text-2xl lg:text-4xl mb-5">
            But going out to get{" "}
            <span className="text-red-500">food costs time...</span>
          </h2>
          <h3 className="text-2xl mb-5">
            Why not order <span className="text-red-500">pizza</span> or
            something <br /> <span className="text-red-500">delicous</span> from
            our restaurant?
          </h3>
          <p className="text-gray-500 mb-5">
            Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
            Blanditiis eum optio corrupti magnam aperiam quod veniam?
          </p>

          <div className="flex gap-2">
            <button className="bg-red-600 px-5 py-2 text-white rounded">
              Order now!
            </button>

            <a href="#offer">
              <button className="bg-red-600 px-5 py-2 text-white rounded flex items-center">
                See what is avalaible <AiOutlineArrowDown></AiOutlineArrowDown>
              </button>
            </a>
          </div>
        </div>
        <div>
          <img className="w-full h-full" src={banner} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

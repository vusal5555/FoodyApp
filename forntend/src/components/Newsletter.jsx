import newsletter from "../assets/get-newsletter-updates.svg";
import { AiOutlineSend } from "react-icons/ai";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl text-gray-700 mb-4 font-bold">
        Get out latest offers
      </h2>
      <h1 className="text-4xl text-red-500 mb-10 font-bold">Newsletter</h1>

      <form className="mb-10 w-[90%] lg:w-[500px] rounded-full py-2 px-5 flex items-center border border-gray-400">
        <input
          type="text"
          className="w-[100%] mr-5 outline-none border-none"
          placeholder="enter email"
        />
        <button>
          <AiOutlineSend></AiOutlineSend>
        </button>
      </form>

      <img src={newsletter} className="w-[400px]" alt="" />
    </div>
  );
};

export default Newsletter;

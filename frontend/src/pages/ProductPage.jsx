import { useParams } from "react-router-dom";
import { foods } from "../data/data";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductPage = () => {
  const { id } = useParams();

  const food = foods.find((food) => food.id === id);

  return (
    <div>
      <div className="max-w-[80%] m-auto grid lg:grid-cols-2 gap-[5rem] mt-[3rem]">
        <div>
          <img src={food.img} className="w-full h-full" alt="" />
        </div>
        <div className="flex flex-col gap-[3rem]">
          <h1 className="text-4xl font-bold">{food.name}</h1>
          <div>
            <h2 className="text-red-400 text-2xl">Price: ${food.price}</h2>
            <input type="number" />
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl">Category:</h2>
            <h2 className="bg-red-500 px-6 py-2 text-white rounded-full capitalize">
              {food.category}
            </h2>
          </div>
          <h3 className="mt-[5rem] text-2xl">Description: abc</h3>

          <button className="bg-red-500 px-6 py-2 rounded-full text-white w-[200px] flex items-center justify-center">
            Add to cart <AiOutlineShoppingCart></AiOutlineShoppingCart>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

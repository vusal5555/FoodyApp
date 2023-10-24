import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useGetSingProductQuery } from "../slices/productsSlice";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const ProductPage = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: food, isLoading, error } = useGetSingProductQuery(id);

  if (isLoading) {
    return <Loader></Loader>;
  }

  const addToCartHandler = async () => {
    try {
      dispatch(addToCart({ ...food, qty }));
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="max-w-[80%] m-auto grid lg:grid-cols-2 gap-[5rem] mt-[3rem]">
        <div>
          <img src={food.img} className="w-full h-full rounded-lg" alt="" />
        </div>
        <div className="flex flex-col gap-[3rem]">
          <h1 className="text-4xl font-bold">{food.name}</h1>
          <div>
            <h2 className="text-red-400 text-2xl">Price: ${food.price}</h2>
            <select
              data-te-select-init
              className="mt-3"
              onChange={(e) => setQty(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl">Category:</h2>
            <h2 className="bg-red-500 px-6 py-2 text-white rounded-full capitalize">
              {food.category}
            </h2>
          </div>
          <h3 className="mt-[5rem] text-2xl">Description: abc</h3>

          <button
            className="bg-red-500 px-6 py-2 rounded-full text-white w-[200px] 
          flex items-center justify-center"
            onClick={() => addToCartHandler()}
          >
            Add to cart <AiOutlineShoppingCart></AiOutlineShoppingCart>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

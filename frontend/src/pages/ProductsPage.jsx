import { Link, useParams } from "react-router-dom";
import { foods } from "../data/data";

const ProductsPage = () => {
  const { name } = useParams();

  const filteredFoods = foods.filter((food) => food.category === name);

  console.log(filteredFoods);

  return (
    <div className="max-w-[80%] mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5  mt-[10rem]">
      {filteredFoods.map((food) => {
        return (
          <Link to={`/product/${food.id}`}>
            <div className="mb-5">
              <div className="w-[300px] h-[300px] mx-auto overflow-hidden">
                <img
                  src={food.img}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-[300px] m-auto lg:w-full flex items-center justify-between mt-5">
                <p className="text-lg font-bold">{food.name}</p>
                <p>
                  <span className="text-red-500">$</span>

                  {food.price}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsPage;

import { Link, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../slices/productsSlice";

import Loader from "../components/Loader";

const ProductsPage = () => {
  const { name } = useParams();

  const { data: foods, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) {
    return <Loader></Loader>;
  }
  const filteredFoods = foods.filter((food) => food.category === name);

  return (
    <div>
      <div className="container m-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-[10rem] p-5">
        {filteredFoods.map((food) => {
          return (
            <div key={food._id}>
              <Link to={`/product/${food._id}`}>
                <div className="mb-5 border border-gray-300 p-5 shadow-md">
                  <div className="h-[300px] w-full">
                    <img
                      src={food.img}
                      className="w-full h-full rounded-md object-cover"
                      alt={food.name}
                    />
                  </div>
                  <div className="flex items-center m-auto justify-between mt-5">
                    <p className="text-lg font-bold">{food.name}</p>
                    <p className="font-bold">
                      <span className="text-red-500">$</span>

                      {food.price}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;

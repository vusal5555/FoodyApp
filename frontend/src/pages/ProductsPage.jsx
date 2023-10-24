import { Link, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../slices/productsSlice";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const { name } = useParams();

  const { data: foods, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  const filteredFoods = Object.values(foods).filter(
    (food) => food.category === name
  );

  return (
    <div>
      <div className="container m-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-[10rem]">
        {filteredFoods.map((food) => {
          return (
            <>
              <Link to={`/product/${food._id}`}>
                <div className="mb-5">
                  <div>
                    <img
                      src={food.img}
                      className="w-[300px] h-[300px] mx-auto  object-cover"
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
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;

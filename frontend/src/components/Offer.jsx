import { foodTypes } from "../data/data";
import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <section className="text-center mb-[15rem] mt-[5rem]" id="foods">
      <p className="text-gray-500 text-xl lg:text-2xl">What we offer</p>
      <h1 className="text-3xl lg:text-4xl text-red-500 font-bold mb-10">
        Best meals in the city
      </h1>
      <div className="container m-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-[5rem] p-5">
        {foodTypes.map((foodType, index) => {
          return (
            <Link to={`/products/${foodType.name}`} key={index}>
              <p className="mb-2 text-xl text-gray-500 font-bold inline-block">
                {foodType.name.toUpperCase()}
              </p>
              <div className="w-full md:w-[300px] h-[300px] m-auto overflow-hidden rounded-md">
                <img
                  src={foodType.img}
                  className="w-full h-full object-cover transition-transform hover:scale-[1.1] cursor-pointer"
                  alt=""
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Offer;

import { foodTypes } from "../data/data";

const Offer = () => {
  return (
    <div className="text-center my-[15rem]">
      <p className="text-gray-500 text-2xl">What we offer</p>
      <h1 className="text-4xl text-red-500 font-bold mb-10">
        Best meals in the city
      </h1>
      <div
        className="max-w-[80%] mx-auto grid items-center md:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-4"
      >
        {foodTypes.map((foodType, index) => {
          return (
            <div key={index}>
              <p className="mb-2 text-xl text-gray-500 font-bold">
                {foodType.name.toUpperCase()}
              </p>
              <div className="w-[100%] md:w-[300px] h-[300px] mx-auto overflow-hidden ">
                <img
                  src={foodType.img}
                  className="w-full h-full object-cover transition-transform hover:scale-[1.1] cursor-pointer"
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offer;

import deliveryImg1 from "../assets/male-delivery-guy-riding-scooter.svg";
import deliveryImg2 from "../assets/delivery-location.svg";
import deliveryImg3 from "../assets/deliveryman-with-pizza.svg";

const Delivery = () => {
  return (
    <div className="text-center my-[15rem]">
      <p className="text-gray-500 text-2xl">Delivery</p>
      <h1 className="text-4xl text-red-500 font-bold mb-5">
        Always on time for you
      </h1>
      <div className="max-w-[80%] mx-auto grid items-center lg:grid-cols-3">
        <div>
          <img src={deliveryImg1} className="w-[300px] mx-auto h-full" alt="" />
          <p className="text-gray-500 text-xl font-bold">
            Our Delivery guy is always on time
          </p>
        </div>
        <div>
          <img src={deliveryImg2} className="w-[300px] mx-auto h-full" alt="" />
          <p className="text-gray-500 text-xl font-bold">He works very hard</p>
        </div>
        <div>
          <img src={deliveryImg3} className="w-[300px] mx-auto h-full" alt="" />
          <p className="text-gray-500 text-xl font-bold">
            He is friendly and social
          </p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;

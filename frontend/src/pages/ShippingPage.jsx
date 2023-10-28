import { useState } from "react";
import { saveShippingAddress } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
  const { shippingAddress } = useSelector((store) => store.cart);
  const [address, setAddress] = useState("" || shippingAddress.address);
  const [city, setCity] = useState("" || shippingAddress.city);
  const [postalcode, setPostalcode] = useState(
    "" || shippingAddress.postalcode
  );
  const [country, setCountry] = useState("" || shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(saveShippingAddress({ address, city, postalcode, country }));
      navigate("/payment");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-[5rem]">
      <form
        onSubmit={submitHandler}
        className="w-[90%] lg:w-[500px] bg-red-500 text-white p-5 rounded-md"
      >
        <div className="flex flex-col my-3">
          <label className="text-lg  mb-3">Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md text-black border border-gray-300 outline-none"
            placeholder="enter address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col my-3">
          <label className="text-lg  mb-3">City</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md text-black border border-gray-300 outline-none"
            placeholder="enter city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col my-3">
          <label className="text-lg  mb-3">Postal Code</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md text-black border border-gray-300 outline-none"
            placeholder="enter postalcode"
            required
            value={postalcode}
            onChange={(e) => setPostalcode(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col my-3">
          <label className="text-lg  mb-3">Country</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md text-black border outline-none"
            placeholder="enter country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white w-full px-4 py-2 rounded-md mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;

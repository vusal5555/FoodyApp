import { useState, useEffect } from "react";
import { savePaymentMethod } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const { shippingAddress } = useSelector((store) => store.cart);

  console.log(shippingAddress);

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/placeorder");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[5rem] ">
      <form
        onSubmit={submitHandler}
        className="bg-red-500 text-white p-5 rounded-lg"
      >
        <div className="my-5 ">
          <h1 className="text-4xl font-bold mb-5">Payment Method</h1>

          <h2 className="text-lg font-semibold">Select Method</h2>

          <input
            type="radio"
            id="paymentMethod"
            checked
            required
            value="PayPal"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paymentMethod">PayPal or Credit Card</label>
        </div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCartItems } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const PlaceOrderPage = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((store) => store.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      setDisabled(true);
    }
  }, [cart.cartItems]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <div className="container m-auto grid gap-y-5 p-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="py-5 border border-b-gray-300 border-white">
            <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address},{cart.shippingAddress.city},
              {cart.shippingAddress.postalcode},{cart.shippingAddress.country}
            </p>
          </div>
          <div className="py-5 border border-b-gray-300 border-white">
            <h1 className="text-2xl font-semibold mb-4">Payment</h1>
            <p>
              <strong>Payment Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>
          <div className="py-5 border border-b-gray-300 border-white">
            <h1 className="text-2xl font-semibold mb-4">Ordered Items</h1>
            <p className="mb-4">
              <strong>items: </strong>
            </p>
            {cart.cartItems.map((item, index) => {
              return (
                <div
                  className="w-full lg:w-[400px] grid grid-cols-4 mb-4"
                  key={index}
                >
                  <div className="w-[50px] h-[50px]">
                    <img
                      src={item.img}
                      className="w-full h-full rounded-md"
                      alt=""
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="w-full text-start text-lg text-gray-500">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border border-gray-300">
          <div className="py-5 px-5 pb-10 border border-b-gray-400 border-white">
            <h1 className="text-3xl font-semibold">Order Summary</h1>
          </div>
          <div className="p-5 grid grid-cols-2 items-center border border-b-gray-400 border-white">
            <div>
              <p>items</p>
            </div>
            <div>
              <p>${cart.itemsPrice}</p>
            </div>
          </div>
          <div className="p-5 grid grid-cols-2 items-center border border-b-gray-400 border-white">
            <div>
              <p>Shipping</p>
            </div>
            <div>
              <p>${cart.shippingPrice}</p>
            </div>
          </div>
          <div className="p-5 grid grid-cols-2 items-center border border-b-gray-400 border-white">
            <div>
              <p>Tax</p>
            </div>
            <div>
              <p>${cart.taxPrice}</p>
            </div>
          </div>
          <div className="p-5 grid grid-cols-2 items-center border border-b-gray-400 border-white">
            <div>
              <p>Total</p>
            </div>
            <div>
              <p>${cart.totalPrice}</p>
            </div>
          </div>
          <div className="p-5">
            <button
              className={
                disabled
                  ? `text-white bg-red-300 px-4 py-2 rounded-md`
                  : `text-white bg-red-500 px-4 py-2 rounded-md`
              }
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            {isLoading && <Loader></Loader>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;

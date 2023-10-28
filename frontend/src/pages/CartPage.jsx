import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

const CartPage = () => {
  const [disabled, setDisabled] = useState(false);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const { cartItems, itemsPrice } = cart;

  const deleetHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setDisabled(true);
    }
  }, [cartItems]);

  return (
    <div className="container grid m-auto md:grid-cols-2 mt-[5rem] gap-5">
      <div className="flex flex-col border border-gray-300">
        {cartItems.map((item, index) => {
          return (
            <div
              className="grid grid-cols-4 gap-5 w-full p-5 rounded-md"
              key={index}
            >
              <div className="w-full lg:w-[100px] h-[100px] block">
                <img
                  src={item.img}
                  className="w-full h-full rounded-lg object-cover"
                  alt=""
                />
              </div>
              <h2>{item.name}</h2>
              <h2>
                {item.qty} x {item.price} = ${item.qty * item.price}
              </h2>
              <div>
                <button onClick={() => deleetHandler(item._id)}>
                  <FaTrash></FaTrash>
                </button>
              </div>
            </div>
          );
        })}

        {cartItems.length === 0 && (
          <h1 className="p-5 text-white bg-red-500 h-full text-2xl font-bold flex justify-center items-center">
            Cart is empty!
          </h1>
        )}
      </div>
      <div className="border border-gray-300 p-5">
        <div>
          <h2 className="text-3xl capitalize font-bold mb-5 ">
            Subtotal: ({cartItems.reduce((a, c) => a + c.qty, 0)}) items
          </h2>
        </div>
        <div>
          <h2 className="mb-5">${itemsPrice}</h2>
        </div>
        <div>
          <Link to="/shipping">
            <button
              disabled={cartItems.length === 0}
              className={
                disabled
                  ? `text-white bg-red-300 px-6 py-2 rounded-md`
                  : `text-white bg-red-500 px-6 py-2 rounded-md`
              }
            >
              Proceed to checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

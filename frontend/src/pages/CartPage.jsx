import React from "react";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";

const CartPage = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const { cartItems, itemsPrice } = cart;

  const deleetHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="grid grid-cols-2 mt-[5rem]">
      <div className="max-w-[80%] mx-auto flex flex-col gap-[5rem]">
        {cartItems.map((item) => {
          return (
            <div className="grid grid-cols-4 gap-5">
              <div>
                <img
                  src={item.img}
                  className="w-[100px] h-[100px] rounded-lg object-cover"
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
      </div>
      <div>
        <div>
          <h2 className="text-3xl capitalize font-bold mb-5">
            Subtotal: ({cartItems.reduce((a, c) => a + c.qty, 0)}) items
          </h2>
        </div>
        <div>
          <h2 className="mb-5">${itemsPrice}</h2>
        </div>
        <div>
          <button className="text-white bg-red-500 px-6 py-2 rounded-md">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

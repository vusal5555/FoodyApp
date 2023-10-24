import React from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cart = useSelector((store) => store.cart);

  const { cartItems, itemsPrice } = cart;

  return (
    <div className="grid grid-cols-2 mt-[5rem]">
      <div className="max-w-[80%] mx-auto flex flex-col gap-[5rem]">
        {cartItems.map((item) => {
          return (
            <div className="grid grid-cols-3 gap-5">
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

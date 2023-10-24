import React from "react";
import { AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const { userInfo } = useSelector((store) => store.userInfo);
  return (
    <div>
      <div className="max-w-[80%] mx-auto items-center justify-between p-4 mb-10 hidden lg:flex ">
        <Link to="/">
          <h1 className="text-red-500 font-bold text-4xl">Foody</h1>
        </Link>

        <nav>
          <ul className="flex items-center uppercase gap-3 text-gray-500">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Contacts</a>
            </li>
            <li>
              <a>Foods</a>
            </li>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a>CREATE</a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <p className="text-xl">
            <AiOutlineUserAdd></AiOutlineUserAdd>
          </p>
          <Link to="/cart">
            <p className="text-xl relative">
              <AiOutlineShoppingCart className="w-6 h-6"></AiOutlineShoppingCart>{" "}
              <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 ">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            </p>
          </Link>

          {userInfo ? (
            <p>{userInfo.name}</p>
          ) : (
            <Link to="/login">
              <p>Sign In</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

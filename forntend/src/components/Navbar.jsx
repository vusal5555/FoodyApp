import React from "react";
import { AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div>
      <div className="max-w-[80%] mx-auto items-center justify-between p-4 mb-10 hidden lg:flex ">
        <h1 className="text-red-500 font-bold text-4xl">Foody</h1>

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
          <p className="text-xl">
            <AiOutlineShoppingCart></AiOutlineShoppingCart>
          </p>
          <p>Sign In</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

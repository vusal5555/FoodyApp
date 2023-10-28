import React from "react";
import { AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogOutMutation } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { unsetCredentials } from "../slices/usersCredentialsSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const { userInfo } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();
  const [logOut, { isLoading, error }] = useLogOutMutation();

  const logOutHandler = async () => {
    try {
      await logOut();
      dispatch(unsetCredentials());
      toast.success("User logged out");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div>
      <div className="container m-auto items-center justify-between p-4 mb-10 hidden lg:flex">
        <Link to="/">
          <h1 className="text-red-500 font-bold text-4xl">Foody</h1>
        </Link>

        <nav>
          <ul className="flex items-center uppercase gap-3 text-gray-500">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#contacts">Contacts</a>
            </li>
            <li>
              <a href="#foods">Foods</a>
            </li>
            <li>
              <a href="#newsletter">Newsletter</a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart">
            <p className="text-xl relative">
              <AiOutlineShoppingCart className="w-6 h-6"></AiOutlineShoppingCart>{" "}
              <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 ">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            </p>
          </Link>

          {userInfo ? (
            <Link to="/profile">
              <p>{userInfo.name}</p>
            </Link>
          ) : (
            <Link to="/login">
              <p>Sign In</p>
            </Link>
          )}

          {userInfo && <button onClick={logOutHandler}>Log Out</button>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

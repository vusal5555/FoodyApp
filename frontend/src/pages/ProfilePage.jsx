import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { setCredentials } from "../slices/usersCredentialsSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((store) => store.userInfo);

  const [updateUserProfile, { isLoading, error }] =
    useUpdateUserProfileMutation();

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateUserProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("user updated");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div>
      <div className="container m-auto grid md:grid-cols-12 p-5 gap-5">
        <div className="col-span-12 lg:col-span-3">
          <h1 className="text-xl font-bold mb-4">Update your profile</h1>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-gray-400">Name</label>
              <input
                className="w-full border border-gray-300 px-2 py-2 text-gray-400"
                type="text"
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-gray-400">Email</label>
              <input
                className="w-full border border-gray-300 px-2 py-2 text-gray-400"
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-gray-400">Password</label>
              <input
                className="w-full border border-gray-300 px-2 py-2 text-gray-400"
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-gray-400">Confirm Password</label>
              <input
                className="w-full border border-gray-300 px-2 py-2 text-gray-400"
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <h2 className="text-xl font-bold mb-4">My Orders</h2>

          {ordersLoading ? (
            <Loader></Loader>
          ) : ordersError ? (
            <p>{ordersError?.data?.message}</p>
          ) : (
            <table className="min-w-full text-md text-left text-gray-500 dark:text-gray-400">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>Details</th>
                </tr>
              </thead>
              {orders.map((order) => {
                return (
                  <tbody key={order._id}>
                    <tr>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <button className="bg-red-500 text-white px-2 py-2 rounded-md">
                            details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

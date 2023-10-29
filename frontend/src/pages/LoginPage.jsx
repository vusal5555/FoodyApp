import { useState } from "react";
import { useLoginMutation } from "../slices/authSlice";
import { setCredentials } from "../slices/usersCredentialsSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User logged in");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="max-w-[500px] h-full bg-red-500 text-white p-10 mt-[5rem] rounded-md"
      >
        <div className="flex flex-col gap-2 mb-5">
          <label>Email</label>
          <input
            type="email"
            className="px-4 py-2 outline-none rounded-md text-black"
            placeholder="enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label>Password</label>
          <input
            type="password"
            className="px-4 py-2 outline-none rounded-md text-black"
            placeholder="enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white w-full px-4 py-2 rounded-md"
        >
          Submit
        </button>

        {isLoading && <Loader></Loader>}

        <p className="mt-2">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

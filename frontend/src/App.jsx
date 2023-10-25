import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <Navbar></Navbar>
      <main className="w-full">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;

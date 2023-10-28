import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
} from "react-icons/ai";

const Footer = () => {
  return (
    <section
      className="mt-[10rem] bg-red-500 p-[5rem] text-white"
      id="contacts"
    >
      <div className="container m-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="mb-5">
          <h2 className="text-2xl font-bold mb-5">Working days</h2>
          <ul>
            <li>Monday - Friday</li>
            <li>08:00 - 22:00</li>
            <li className="mt-3">Saturday</li>
            <li>08:00 - 20:00</li>
          </ul>
        </div>
        <div className="mb-5">
          <h2 className="text-2xl font-bold mb-5">Newsletter</h2>
          <ul>
            <li>Subscribe to our newsletter</li>
            <li>Receive the latest meals</li>
            <li>Get the menu with promos</li>
            <li>Everything weekly!</li>
          </ul>
        </div>
        <div className="mb-5">
          <h2 className="text-2xl font-bold mb-5">Social Media</h2>
          <ul className="flex gap-2 items-center">
            <li>
              <AiFillInstagram />
            </li>
            <li>
              <AiFillFacebook />
            </li>
            <li>
              <AiFillTwitterCircle />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;

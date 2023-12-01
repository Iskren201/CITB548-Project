import React from "react";
import backgroundImg from "../../img/backgroundImg.avif";

const HomeClient = () => {
  return (
    <div
      className="bg-cover text-white min-h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="text-4xl font-bold mb-4 ">
        Welcome to Our Logistics Company
      </div>
      <p className="text-lg text-center mb-8">
        We deliver your packages with care and precision. Trust us for reliable
        and efficient logistics services.
      </p>
    </div>
  );
};

export default HomeClient;

import React from "react";
import { Avatar } from "./BlogCard";
import { Link } from "react-router";

const Appbar = () => {
  return (
    <div className="flex justify-between px-10 border-b py-4">
      <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer text-4xl font-bold">
        Medeum
      </Link>
      <div>
        <Link to={'/publish'}>
      <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New +

      </button>
      </Link>
      <Link to={'/signup'}>
        <button className=" mr-4 text-white bg-blue-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Logout</button>
        </Link>
        <Avatar size={"big"} name="yash" />
        
      </div>
    </div>
  );
};

export default Appbar;

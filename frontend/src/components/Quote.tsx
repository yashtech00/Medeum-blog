import React from "react";

const Quote = () => {
  return (
    <div className=" bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg ">
          <div className="  text-3xl font-bold ">
            "The customer service i recevied was exceptional. The support team
            went above and beyond to address my concerns."
          </div>
          <div className="max-w-lg text-left  text-xl font-semibold mt-4">
            Jules winnfield
          </div>
          <div className="max-w-lg text-left text-sm  font-thin">
            CEO,Acme inc
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;

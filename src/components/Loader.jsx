import React from "react";
import { TbLoaderQuarter } from "react-icons/tb";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto text-4xl">
      <TbLoaderQuarter className="text-7xl animate-spin" />
      <span>Asking ChatGPT...</span>
    </div>
  );
};

export default Loader;

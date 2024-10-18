import { LoaderPinwheel } from "lucide-react";
import React from "react";
import { TbLoader3 } from "react-icons/tb";

const Loader = ({className}) => {
//   return <TbLoader3 className={`animate-spin ${className}`} size={24} />;
  return <LoaderPinwheel className={`animate-spin ${className}`} size={24}/>
};

export default Loader;

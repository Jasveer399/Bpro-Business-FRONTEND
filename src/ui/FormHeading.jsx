import React from "react";
import { CgCloseO } from "react-icons/cg";
import Divider from "./Divider";

function FormHeading({ title, closeDialog }) {
  return (
    <>
      <div className="flex justify-between px-5 py-3 w-full items-center">
        <h1 className="font-semibold">{title}</h1>
        <CgCloseO
          onClick={() => closeDialog()}
          className="text-xl cursor-pointer hover:text-blue transform duration-150 ease-in-out"
        />
      </div>
      <Divider className="dark:via-darkgrey" />
    </>
  );
}

export default FormHeading;

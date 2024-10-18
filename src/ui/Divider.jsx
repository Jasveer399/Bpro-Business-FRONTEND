import React from "react";

function Divider({ className }) {
  return (
    <hr
      className={`h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-colorText2  to-transparent opacity-25 dark:opacity-100 ${
        className ? className : "dark:via-colorText"
      }`}
    />
  );
}

export default Divider;

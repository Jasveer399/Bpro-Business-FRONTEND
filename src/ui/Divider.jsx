import React from "react";

function Divider({ className }) {
  return (
    <hr
      className={`h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-colorText2 dark:via-colorText to-transparent opacity-25 dark:opacity-100`}
    />
  );
}

export default Divider;

import React from "react";

function ContactCard({icon, heading, info}) {
  return (
    <>
      <div className="bg-white h-96 w-96 flex flex-col items-center justify-center  shadow-md hover:shadow-lg">
        <div className="p-5 bg-[#EB6752] rounded-2xl">
          {icon}
        </div>
        <h1 className="font-semibold text-2xl mt-9 mb-3">{heading}</h1>
        <p className="text-[#777777] text-center">{info}</p>
      </div>
    </>
  );
}

export default ContactCard;

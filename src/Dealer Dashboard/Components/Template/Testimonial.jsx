import React from "react";

const Testimonial = ({ testimonial }) => {
    console.log("testimonial", testimonial);
  return (
    <div className="bg-white p-5 rounded-md shadow-md space-y-3 my-2">
      <div className="flex items-center gap-3 mb-3 ml-2">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-[700]">{testimonial.name}</h2>
          <p className="text-sm text-center text-gray-600">
            {testimonial.designation}
          </p>
        </div>
      </div>
      <p className="text-gray-700">{testimonial.content}</p>
    </div>
  );
};

export default Testimonial;

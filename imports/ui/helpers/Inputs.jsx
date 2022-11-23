import React from "react";

const Inputs = ({ id, label, register }) => {
  return (
    <div>
      <label className="block uppercase font-thin-bold text-black">
        {label}
      </label>
      <input
        className="mb-2 border-2 w-2/5 p-2 mt-2 placeholder-gray-400 rounded-sm border-gray-200 text-black"
        {...register(id, { required: true })}
        placeholder={label}
      />
    </div>
  );
};

export default Inputs;

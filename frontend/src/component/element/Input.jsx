import React from "react";

const Input = ({ formik, formikName, inputType, inputPlaceholder }) => {
  return (
    <input
      type={inputType}
      placeholder={inputPlaceholder}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 pl-2 mt-2"
      {...formik.getFieldProps(`${formikName}`)}
    />
  );
};

export default Input;

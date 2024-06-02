import React from "react";

export const AlertSukses = ({ title, quote, handleClose }) => {
  return (
    <div
      className="bg-blue-100 border-t border-b h-32 w-96 z-10 text-blue-700 px-4 py-3"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p className="text-sm">{quote}</p>
      <button
        onClick={handleClose}
        className="bg-blue-500 tracking-wider hover:bg-blue-700 text-white font-bold py-2 my-4 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        close
      </button>
    </div>
  );
};

export const AlertGagal = ({
  handleClose,
  quote,
  handleDelete,
  height,
  children,
}) => {
  return (
    <div className="w-4/5 absolute flex justify-center ">
      <div
        className={`${height} bg-orange-100 border-l-4 border-orange-500  w-96 text-orange-700 p-4 absolute z-10`}
        role="alert"
      >
        <p className="font-bold">peringatan</p>
        <p>{quote}</p>
        {children}
        <div className="flex justify-evenly w-full">
          <button
            onClick={handleClose}
            className="bg-red-500 tracking-wider hover:bg-red-700 text-white font-bold py-2 my-4 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            close
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 tracking-wider hover:bg-red-700 text-white font-bold py-2 my-4 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

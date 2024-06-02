import React from "react";

export const ButtonCard = ({ model, handleClick,style }) => {
    
  return (
    <button
      onClick={handleClick}
      className={`rounded-lg border border-gray-900 py-2 px-2 lg:py-3 lg:px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 ${style}`}
      type="button"
    >
      {model}
    </button>
  );
};

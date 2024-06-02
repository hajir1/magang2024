import React from "react";

export const ErrorMessage = ({ message }) => {
  return <p className="text-red-500 text-sm italic text-center py-2">{message}</p>;
};

import { useFormik } from "formik";
import React, { useState } from "react";
import { APILogin } from "../services/API_CALL.service";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../component/element/Message";
import { jwtDecode } from "jwt-decode";
import { useToken } from "../state/zustand";
const Input = ({
  labelName,
  formik,
  formikName,
  inputPlaceholder,
  inputType,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        {labelName}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={inputType}
        placeholder={inputPlaceholder}
        {...formik.getFieldProps(`${formikName}`)}
      />
    </div>
  );
};

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setToken, token } = useToken();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (value) => {
      APILogin(value, (cb) => {
        if (cb?.response?.status === 500) {
          setErrorMessage(cb?.response?.data?.message);
        } else {
          const data = jwtDecode(cb?.data?.accessToken);
          setToken(data);
          if (token.username === "penerima") {
            navigate("/datapemesanan");
          } else {
            navigate("/lihatkendaraan");
          }
        }
      });
    },
  });
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {" "}
      <div className="w-full max-w-xs">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-300"
        >
          <Input
            formik={formik}
            formikName={"username"}
            inputPlaceholder={"username"}
            inputType={"text"}
            labelName={"username"}
          />
          <Input
            formik={formik}
            inputPlaceholder={"*******"}
            inputType={"password"}
            formikName={"password"}
            labelName={"password"}
          />

          <ErrorMessage message={errorMessage} />
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

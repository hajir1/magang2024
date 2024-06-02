import React, { useEffect, useState } from "react";
import { useDashboard, useToken } from "../../state/zustand";
import IconOrang from "../element/Icon/IconOrang";
import { APILogout} from "../../services/API_CALL.service";

const Navbar = () => {
  const [hamburgerMenu, sethamburgerMenu] = useState(false);
  const { setDashboard } = useDashboard();
  const { token, logout } = useToken();
  return (
    <div className="w-full h-12 bg-indigo-600">
      <div className="h-full flex items-center justify-between ">
        <div
          onClick={() => {
            sethamburgerMenu(!hamburgerMenu), setDashboard();
          }}
          className="flex flex-col p-1 mx-4 lg:hidden "
        >
          <div
            className={`${
              hamburgerMenu && "rotate-45 origin-left w-[1.5rem]"
            } w-7 h-1 bg-white mt-1 duration-500 transition-all`}
          ></div>
          <div
            className={`${hamburgerMenu && "invisible"} w-7 h-1 bg-white mt-1 `}
          ></div>
          <div
            className={`${
              hamburgerMenu && "-rotate-45 origin-left w-[1.5rem]"
            } w-7 h-1 bg-white mt-1 duration-500 transition-all`}
          ></div>
        </div>
        <div className="w-4/5 ml-12 flex items-center justify-between lg:w-full ">
          <div className="flex items-center justify-center">
            <IconOrang />
            <h1 className="text-white mx-2 uppercase border-b-2 border-b-white tracking-widest text-semibold text-shadow-custom lg:text-xl lg:mx-4">
              {token.username}
            </h1>
          </div>
          <h1
            onClick={() => {
              APILogout(), logout(), (window.location.href = "/");
            }}
            className="text-white uppercase cursor-pointer  tracking-widest text-semibold text-shadow-custom lg:text-xl mr-4 lg:mx-4"
          >
            logout
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

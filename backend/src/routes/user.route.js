import express from "express";
import {
  GetUserC,
  LoginUserC,
  Logout,
  Me,
  RegisterUserC,
  deleteUsersC,
} from "../controller/user.controller.js";

const route = express.Router();
route.post("/register", RegisterUserC);
route.delete("/deleteuser/:id", deleteUsersC);
route.post("/login", LoginUserC);
route.get("/users", GetUserC);
route.get("/me", Me);
route.delete("/logout", Logout);
export default route;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import session from "express-session";
// import KnexSessionStore from "connect-session-knex";
// import knex from "knex";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware.js";
import routes from "./routes/mainRoute.js";
dotenv.config();

const app = express();
// const db = new knex({
//   client: "mysql",
//   connection: {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "magang_sekawan_media",
//   },
// });
// const store = new (KnexSessionStore(session))({
//   knex: db,
//   tablename: "sessions",
// });
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    // store: store,
    saveUninitialized: true,
    cookie: { secure: "auto", maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ErrorMiddleware);
app.use(routes);
app.listen(process.env.PORT, () => {
  console.log(`server running in port ${process.env.PORT}`);
});

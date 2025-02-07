import { ErrorHandling, NotFoundError } from "./utils/handling.js";
import { connectDB } from "./config/connectDB.js";

import expressLayouts from "express-ejs-layouts";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import router from "./router/index.routes.js";
import dotenv from "dotenv";
import flash from "connect-flash";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// ========== Connect DB =============
connectDB();

// ========== Middlewares =============
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ========== Set View Engine =============
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layout/main.ejs");

// ========== Set Up Session && Flash =============
app.use(
  session({ secret: "secret key", resave: false, saveUninitialized: false })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// ========== Set Up Passport =============
// ========== Routers =============
app.use(router);
app.use(NotFoundError);
app.use(ErrorHandling);

// ========== Set Up Server =============
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

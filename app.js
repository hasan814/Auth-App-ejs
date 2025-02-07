import expressLayouts from "express-ejs-layouts";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import router from "./router/index.routes.js";
import flash from "express-flash";

const app = express();
const PORT = process.env.PORT || 3000;

// ========== Set Up App =============
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());

// ========== Set View Engine =============
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layout/main.ejs");

// ========== Set Up Session =============
app.use(
  session({ secret: "secret key", resave: false, saveUninitialized: false })
);

// ========== Set Up Passport =============
// ========== Routers =============
app.use(router);

// ========== Set Up Server =============
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

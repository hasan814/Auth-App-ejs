import expressLayouts from "express-ejs-layouts";
import express from "express";
import morgan from "morgan";
import router from "./router/index.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ========== Set Up App =============
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ========== Set View Engine =============
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layout/main.ejs");

// ========== Set Up Session =============
// ========== Set Up Passport =============
// ========== Routers =============
app.use(router);

// ========== Set Up Server =============
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

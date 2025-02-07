import { ensureAuthenticated } from "../utils/authenticated.js";
import { login, register } from "../controller/auth.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index.ejs", { title: "Home" });
});

router.get("/login", (req, res) => {
  res.render("login.ejs", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register.ejs", { title: "Register" });
});

router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile.ejs", { title: "Profile", user: req.user });
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged Out Successfully");
    res.redirect("/login");
  });
});

router.post("/register", register);
router.post("/login", login);

export default router;

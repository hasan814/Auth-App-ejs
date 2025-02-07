import { register } from "../controller/auth.controller.js";
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

router.get("/profile", (req, res) => {
  res.render("profile.ejs", {
    title: "Profile",
    user: { _id: "", fullName: "", password: "" },
  });
});

router.post("/register", register);

export default router;

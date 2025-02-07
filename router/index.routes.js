import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index.ejs", { title: "Home" });
});

export default router;

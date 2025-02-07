import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import passport from "passport";

// ============== Register ==============
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "This email is already registered");
      return res.redirect(req.headers.referer || "/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    req.flash("success", "User regsitered Successfully.Please Log In");
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============== Login ==============
export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash("error", info.message || "Login failed");
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/profile");
    });
  })(req, res, next);
};

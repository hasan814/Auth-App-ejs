import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

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
export const login = (req, res) => {};

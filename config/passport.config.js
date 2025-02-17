import { Strategy as LocalStrategy } from "passport-local";

import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

export const passportInit = (passport) => {
  const authenticatedUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User Not Found!" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect Password" });

      return done(null, user);
    } catch (error) {
      done(error);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticatedUser
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

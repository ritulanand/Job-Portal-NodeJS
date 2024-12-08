import { handleSignUpModel, handleLoginModel } from "../models/user.model.js";
import nodemailer from "nodemailer";

export const renderlayout = (req, res) => res.render("layout");
export const renderLogin = (req, res) => res.render("login", { message: null });
export const renderSignUp = (req, res) =>
  res.render("signup", { message: null });

export const handleLogin = (req, res) => {
  const { email, password } = req.body;
  const user = handleLoginModel({ email, password });
  console.log("user", user);

  if (user) {
    req.session.userEmail = user.email;
    res.redirect("/jobs");
  } else {
    res.render("login", {
      message: "Invalid Credentials!",
    });
  }
};

export const handleSignUp = (req, res) => {
  const { email, password, name } = req.body;
  const success = handleSignUpModel({ email, password, name });

  if (success) {
    res.redirect("/login");
  } else {
    res.render("signup", {
      message: "",
      userEmail: req.session.userEmail,
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

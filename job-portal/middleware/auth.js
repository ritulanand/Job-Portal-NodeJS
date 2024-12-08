export const auth = (req, res, next) => {
  if (!req.session.userEmail) {
    return res.redirect("/login");
  }
  next();
};

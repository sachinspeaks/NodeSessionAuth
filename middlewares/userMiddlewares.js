const isAuthenticated = (req, res, next) => {
  console.log("inside isAuthenticated");
  if (!req.session || !req.session.clientId || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = { isAuthenticated };

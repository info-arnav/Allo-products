module.exports = (scope) => {
  switch (scope) {
    case "shop":
      return process.env.ACCESS_SECRET_SHOP;
    case "admin":
      return process.env.ACCESS_SECRET_ADMIN;
    case "user":
    default:
      return process.env.ACCESS_SECRET_USER;
  }
};

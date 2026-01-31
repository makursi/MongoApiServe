import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  let token;
  //检查请求头中的 Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findById(decoded.user?.id).select("-password");

      // console.log("Decoded token:", decoded);
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        isLogged: false,
        message: "Not authorized,token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      isLogged: false,
      message: "Not authorized,no token",
    });
  }
};

export default protect;

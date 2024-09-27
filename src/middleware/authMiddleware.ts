import { error } from "console";

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");

const protect = asyncHandler(
  async (
    req: { headers: { authorization: string }; user: any },
    res: { status: (arg0: number) => void },
    next: () => void
  ) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // get token from header

        token = req.headers.authorization.split(" ")[1];
        console.log("Token received:", token);
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        // GET USER FROM TOKEN
        req.user = await User.findById(decoded.id).select("-password");
        console.log("The user ", req.user);
        if (!req.user) {
          console.log(error);
          res.status(401);
          throw new Error("Not authorized");
        }
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }
    if (!token) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
);

module.exports = { protect };

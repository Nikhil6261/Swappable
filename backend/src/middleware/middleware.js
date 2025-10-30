import jwt from "jsonwebtoken";

export const checktoken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; // store user info for next middleware
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

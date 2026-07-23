import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization:", authHeader);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token:", decoded);

      req.userId = decoded.id;

      next();
    } catch (err) {
      console.log("VERIFY ERROR:", err.name);
      console.log("VERIFY MESSAGE:", err.message);

      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default authMiddleware;
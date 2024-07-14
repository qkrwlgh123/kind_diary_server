import jwt from "jsonwebtoken";

const handleDecodedToken = (req, res, next) => {
  const path = req.path;
  if (path === "/api/user/login" || path === "/api/user/create") return next();

  try {
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];

    const decodedToken = jwt.decode(token, process.env.JWT_KEY);

    if (!decodedToken)
      return res.status(400).json({ code: 400, data: "Not validated token" });

    req.headers = decodedToken;

    return next();
  } catch (err) {
    return res.status(400).json({ code: 400, data: "Not validated token" });
  }
};

export default handleDecodedToken;

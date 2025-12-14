import jwt from "jsonwebtoken";

export const refreshController = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    );

    // Create NEW access token (short lived) // For authorized API calls 
    const accessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({ accessToken });

  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

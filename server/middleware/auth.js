const jwt = require("jsonwebtoken");

function auth(requiredRole) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
      const cookieToken = req.cookies && req.cookies.token;
      const jwtToken = token || cookieToken;
      if (!jwtToken) return res.status(401).json({ error: "Unauthorized" });

      const payload = jwt.verify(jwtToken, process.env.JWT_SECRET || "dev_secret");
      req.user = payload; // { id, role }
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}

module.exports = { auth };


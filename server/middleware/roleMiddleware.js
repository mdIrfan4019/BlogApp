const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // authMiddleware MUST run before this
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action"
      });
    }

    next();
  };
};

export default authorizeRoles;

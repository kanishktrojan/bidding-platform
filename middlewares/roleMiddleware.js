module.exports = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).send({ error: 'Access forbidden: insufficient rights' });
      }
      next();
    };
  };
  
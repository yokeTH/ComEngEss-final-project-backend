const logMiddleware = async (req, res, next) => {
  console.log(`${req.headers['user-agent']} ${req.method} ${req.path}`);
  next();
};

export default logMiddleware;

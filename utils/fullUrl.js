const fullURL = (req) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT;
  if (!protocol) {
    throw new Error("protocol is required !");
  }
  if (!host) {
    throw new Error("host is required !");
  }

  if (!port) {
    throw new Error("port is required");
  }

  const fullUrl = `${protocol}://${host}:${port}`;
  return fullUrl;
};

module.exports = fullURL;

const httpStatus = require("http-status");

function responseJSON({ res, data, status = 400 }) {
  if (!res) throw new Error("response is required !");
  if (!data) throw new Error("data is required !");
  return res.status(status).json({
    status,
    message: httpStatus[status],
    data,
  });
}

module.exports = responseJSON;

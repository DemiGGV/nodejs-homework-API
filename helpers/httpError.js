const ErrMessageArr = {
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Moved Temporarily",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  423: "Locked",
};

const HttpError = (status, message = ErrMessageArr[status]) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = HttpError;

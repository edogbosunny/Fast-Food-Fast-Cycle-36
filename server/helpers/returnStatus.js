const sendResponse = (response, statusCode, message, status, token) => response.status(statusCode).send({
  status,
  data: {
    message,
    token,
  },
});

export default sendResponse;

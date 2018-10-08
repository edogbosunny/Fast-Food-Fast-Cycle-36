const sendResponse = (response, statusCode, message, status, token) => response.status(statusCode).send({
  status,
  data: {
    message,
    token,
  },
});

const sendResponse400 = (response, statusCode, message, status) => response.status(statusCode).send({
  status,
  data: {
    message,
  },
});
export default { sendResponse, sendResponse400 };

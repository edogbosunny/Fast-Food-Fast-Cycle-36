const sendResponse = (response, statusCode, message, status, token) => response.status(statusCode).send({
  status,
  data: {
    message,
    token,
  },
});

const sendResponse40x = (response, statusCode, message, status) => response.status(statusCode).send({
  status,
  data: {
    message,
  },
});
const sendResponseErr = (response, statusCode, status, errors) => response.status(statusCode).send({
  status,
  data: {
    errors,
  },
});
const sendResponse20x = (response, statusCode, status, message, orderStatus, OrderId, quantity, TotalCost, newOrderFromDb) => response.status(statusCode).send({
  status,
  data: {
    message,
    orderStatus,
    OrderId,
    quantity,
    TotalCost,
    newOrderFromDb,
  },
});
const sendUserHistoryResponse = (response, statusCode, status, message, orderStatus, OrderId, quantity, TotalCost, mealItem, userId) => response.status(statusCode).send({
  status,
  data: {
    message,
    orderStatus,
    OrderId,
    quantity,
    TotalCost,
    mealItem,
    userId,
  },
});
const updateHistoryResponse = (response, statusCode, status, message, orderStatus, OrderId, quantity, TotalCost, mealItem, userId) => response.status(statusCode).send({
  status,
  data: {
    message,
    orderStatus,
    OrderId,
    quantity,
    TotalCost,
    mealItem,
    userId,
  },
});
const sendResponse2xx = (response, statusCode, status, message, count, data) => response.status(statusCode).send({
  status,
  data: {
    message,
    count,
    data,
  },
});
const isAutenticationResponse = (response, statusCode, status, message, token) => response.status(statusCode).send({
  status,
  data: {
    message,
    token,
  },
});
export default {
  sendResponse, sendResponse40x, isAutenticationResponse, updateHistoryResponse, sendResponseErr, sendResponse20x, sendResponse2xx, sendUserHistoryResponse,
};

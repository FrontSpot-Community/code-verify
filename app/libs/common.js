export const createError = (message, status) => {
  const error = new Error();
  error.message = message || '';
  status ? error.status = status : null;
  return error;
};

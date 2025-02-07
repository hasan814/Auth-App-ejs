// =============== Not Found ==============
export const NotFoundError = (req, res, next) => {
  res.send({ statusCode: 404, message: "NotFound Page" });
};

// =============== Error Handling ==============
export const ErrorHandling = (req, res, next) => {
  const status = err?.status ?? err?.statusCode ?? 500;
  res.send({
    statusCode: status,
    message: err?.message ?? "internalServerError",
  });
};

const successResponse = (res, message, data = null, extras = {},token) => {
  if (token) {
    return res.status(200).json({
      status: true,
      message,
      data,
      token,
      ...extras,
    });
  }
  return res.status(200).json({
    status: true,
    message,
    data,
    ...extras,
  });
};

export default successResponse;

const greetingHandler = async (event) => {
  // a simple return statement without any status code
  // default status is 200 I believe
  // and headers will be part of the response, not in response headers
  return {
    headers: {
      "Content-type": "application/json",
      "x-xss-protection": "1; mode=block",
      "x-frame-options": "DENY",
    },
    message: "Hello World from Lambda!!",
    event,
  };
};

export { greetingHandler };

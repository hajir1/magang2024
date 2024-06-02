class ResponseError extends Error{
  constructor(status, message) {
    super(status);
    this.message = message;
  }
}

export default ResponseError;

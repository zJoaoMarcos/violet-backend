export class NotAllowedError extends Error {
  constructor() {
    super("Method not allowed.");
  }
}

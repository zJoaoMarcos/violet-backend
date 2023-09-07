export class EmailNotRegisteredError extends Error {
  constructor() {
    super("Email not registered.");
  }
}

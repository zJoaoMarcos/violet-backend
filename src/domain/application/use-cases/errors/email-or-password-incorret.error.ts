export class EmailOrPasswordIncorretError extends Error {
  constructor() {
    super("Email address or password provided is incorrcet.");
  }
}

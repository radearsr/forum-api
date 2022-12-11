const ClientError = require("../ClientError");

describe("ClientError", () => {
  it("should throw when directly use it", () => {
    expect(() => new ClientError("")).toThrowError("cannot instantiate abstract class");
  });
});

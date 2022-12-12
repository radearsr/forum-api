const UserLogin = require("../UserLogin");

describe("UserLogin entities", () => {
  it("should throw error when not contain needed property", () => {
    const payload = {
      username: "radea",
    };

    expect(() => new UserLogin(payload)).toThrowError("USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error when not meet data type specification", () => {
    const payload = {
      username: ["radea"],
      password: 123,
    };

    expect(() => new UserLogin(payload)).toThrowError("USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should create UserLogin entities correctly", () => {
    const payload = {
      username: "radea",
      password: "iloveyou",
    };

    const userLogin = new UserLogin(payload);

    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.password).toEqual(payload.password);
  });
});

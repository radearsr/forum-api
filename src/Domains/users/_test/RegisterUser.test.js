const RegisterUser = require("../RegisterUser");

describe("a RegisterUser entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      username: "abc",
      password: "abc",
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      username: 123,
      fullname: true,
      password: "abc",
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError("REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should throw error when username contains more than 50 character", () => {
    // Arrange
    const payload = {
      username: "radeasuryaramandhitaradeasuryaramandhitaradeasuryaramandhitaradeasuryaramandhitaradeasuryaramandhita",
      fullname: "Radea Surya R",
      password: "iloveyou",
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError("REGISTER_USER.USERNAME_LIMIT_CHAR");
  });

  it("should throw error when username contains restricted character", () => {
    // Arrange
    const payload = {
      username: "radea surya",
      fullname: "Radea Surya R",
      password: "iloveyou",
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError("REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER");
  });

  it("should create registerUser object correctly", () => {
    // Arrange
    const payload = {
      username: "radea",
      fullname: "Radea Surya R",
      password: "iloveyou",
    };

    const { username, password, fullname } = new RegisterUser(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
    expect(fullname).toEqual(payload.fullname);
  });
});

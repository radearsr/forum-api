const bcrypt = require("bcrypt");
const BcryptPasswordHash = require("../BcryptPasswordHash");

describe("BcryptPasswordHash", () => {
  describe("hash function", () => {
    it("should encrypt password correctly", async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, "hash");
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      // Action
      const encryptPassword = await bcryptPasswordHash.hash("plain_password");

      // Assert
      expect(typeof encryptPassword).toEqual("string");
      expect(encryptPassword).not.toEqual("plain_password");
      expect(spyHash).toBeCalledWith("plain_password", 10);
    });
  });
});

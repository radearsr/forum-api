const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const RegisterUser = require("../../../Domains/users/entities/RegisterUser");
const RegisteredUser = require("../../../Domains/users/entities/RegisteredUser");
const pool = require("../../database/postgres/pool");
const UserRespositoryPostgres = require("../UserRepositoryPostgres");

describe("UserRespositoryPostres", () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("verifyAvailableUsername function", () => {
    it("should throw InvariantError when username not available", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        username: "radea",
      });
      const userRepositoryPostgres = new UserRespositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername("radea")).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when username available", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRespositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername("radea"))
        .resolves.not.toThrowError(InvariantError);
    });
  });

  describe("addUser function", () => {
    it("should persist register user", async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: "radea",
        password: "iloveyou",
        fullname: "Radea Surya R",
      });

      const fakeIdGenerator = () => "123";
      const userRepositoryPostgres = new UserRespositoryPostgres(pool, fakeIdGenerator);

      // Action
      await userRepositoryPostgres.addUser(registerUser);

      // Assert
      const users = await UsersTableTestHelper.findUsersById("user-123");
      expect(users).toHaveLength(1);
    });
  });

  it("should return registered user correctly", async () => {
    // Arrange
    const registerUser = new RegisterUser({
      username: "radea",
      password: "iloveyou",
      fullname: "Radea Surya R",
    });
    const fakeIdGenerator = () => "123";
    const userRepositoryPostgres = new UserRespositoryPostgres(pool, fakeIdGenerator);

    // Action
    const registeredUser = await userRepositoryPostgres.addUser(registerUser);

    // Assert
    expect(registeredUser).toStrictEqual(new RegisteredUser({
      id: "user-123",
      username: "radea",
      fullname: "Radea Surya R",
    }));
  });
});

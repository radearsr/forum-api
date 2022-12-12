const InvariantError = require("../../../Commons/exceptions/InvariantError");
const AuthenticationsTableTestHelper = require("../../../../tests/AuthenticationsTableTestHelper");
const pool = require("../../database/postgres/pool");
const AuthenticationRepositoryPostgres = require("../AuthenticationRepositoryPostgres");

describe("AuthenticationRepository", () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addToken function", () => {
    it("should add token to database", async () => {
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
      const token = "token";

      await authenticationRepository.addToken(token);

      const tokens = await AuthenticationsTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(1);
      expect(tokens[0].token).toBe(token);
    });
  });
});

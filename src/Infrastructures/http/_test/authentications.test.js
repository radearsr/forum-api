const pool = require("../../database/postgres/pool");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AuthenticationTableTestHelper = require("../../../../tests/AuthenticationsTableTestHelper");
const container = require("../../container");
const createServer = require("../createServer");
const AuthenticationTokenManager = require("../../../Applications/security/AuthenticationTokenManager");

describe("/authentications endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationTableTestHelper.cleanTable();
  });

  describe("when POST /authentications", () => {
    it("should response 201 and new authentication", async () => {
      const requestPayload = {
        username: "radea",
        password: "iloveyou",
      };
      const server = await createServer(container);

      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "radea",
          password: "iloveyou",
          fullname: "Radea Surya R",
        },
      });

      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.message).toEqual("success");
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });

    it("should response 400 if username not found", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding",
        password: "secret",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("username tidak ditemukan");
    });
  });
});

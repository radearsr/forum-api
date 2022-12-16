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
        username: "surya",
        password: "iloveyou",
      };

      const server = await createServer(container);

      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "surya",
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
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });
  });
});

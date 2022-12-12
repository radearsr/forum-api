const Jwt = require("@hapi/hapi");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const JwtTokenManager = require("../JwtTokenmanager");

describe("JwtTokenManager", () => {
  describe("createAccessToken function", () => {
    it("should create accessToken correctly", async () => {
      const payload = {
        username: "radea",
      };

      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => "mock_token"),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      const accessToken = await jwtTokenManager.createAccessToken(payload);

      expect(mockJwtToken.generate).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(accessToken).toEqual("mock_token");
    });
  });

  describe("createRefreshToken", () => {
    it("should create refreshToken correctly", async () => {
      const payload = {
        username: "radea",
      };
      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => "mock_token"),
      };

      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      expect(mockJwtToken.generate).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
      expect(refreshToken).toEqual("mock_token");
    });
  });
});

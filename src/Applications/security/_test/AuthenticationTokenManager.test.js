const AuthenticationTokenManager = require("../AuthenticationTokenManager");

describe("AuthenticationTokenManager", () => {
  it("should throw eror when invoke unimplemented method", async () => {
    const tokenManager = new AuthenticationTokenManager();

    await expect(tokenManager.createAccessToken("")).rejects.toThrowError("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
    await expect(tokenManager.createRefreshToken("")).rejects.toThrowError("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
    await expect(tokenManager.verifyRefreshToken("")).rejects.toThrowError("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
    await expect(tokenManager.deleteToken("")).rejects.toThrowError("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  });
});

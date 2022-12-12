const AuthenticationsRepository = require("../AuthenticationsRepository");

describe("AuthenticationsRespository interface", () => {
  it("should throw error when invoke unimplemented method", async () => {
    const authenticationsRepository = new AuthenticationsRepository();

    await expect(authenticationsRepository.addToken("")).rejects.toThrowError("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(authenticationsRepository.checkAvailabilityToken("")).rejects.toThrowError("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(authenticationsRepository.deleteToken("")).rejects.toThrowError("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});

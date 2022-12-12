const LoginUserUseCase = require("../LoginUserUseCase");
const UserRespository = require("../../../Domains/users/UserRepository");
const AuthenticationRepository = require("../../../Domains/authentications/AuthenticationsRepository");
const AuthenticationTokenManager = require("../../security/AuthenticationTokenManager");
const PasswordHash = require("../../security/PasswordHash");
const NewAuth = require("../../../Domains/authentications/entities/NewAuth");

describe("GetAuthenticationUseCase", () => {
  it("should orchestrating the get authentication action correctly", async () => {
    const useCasePayload = {
      username: "radea",
      password: "iloveyou",
    };
    const expectedAuthentication = new NewAuth({
      accessToken: "access_token",
      refreshToken: "refresh_token",
    });

    const mockUserRepository = new UserRespository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    mockUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve("encrypted_password"));
    mockPasswordHash.comparePassword = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.accessToken));
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.refreshToken));
    mockUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve("user-123"));
    mockAuthenticationRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    expect(actualAuthentication).toEqual(expectedAuthentication);
    expect(mockUserRepository.getPasswordByUsername)
      .toBeCalledWith("radea");
    expect(mockPasswordHash.comparePassword)
      .toBeCalledWith("iloveyou", "encrypted_password");
    expect(mockUserRepository.getIdByUsername)
      .toBeCalledWith("radea");
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: "radea", id: "user-123" });
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toBeCalledWith({ username: "radea", id: "user-123" });
    expect(mockAuthenticationRepository.addToken)
      .toBeCalledWith(expectedAuthentication.refreshToken);
  });
});

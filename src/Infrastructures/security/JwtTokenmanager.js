const AuthenticationTokenManager = require("../../Applications/security/AuthenticationTokenManager");
const InvariantError = require("../../Commons/exceptions/InvariantError");

class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  async createRefreshToken(payload) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }
}

module.exports = JwtTokenManager;

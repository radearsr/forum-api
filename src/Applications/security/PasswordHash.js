class PasswordHash {
  async hash(password) {
    throw new Error("PASSWORD_HASH.METHOD_NOT_IMPLEMENTED");
  }

  async comparePassword() {
    throw new Error("PASSWORD_HASH.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = PasswordHash;

const DomainErrorTranlator = require("../DomainErrorTranslator");
const InvariantError = require("../InvariantError");

describe("DomainErrorTranlator", () => {
  it("should translate error correctly", () => {
    expect(DomainErrorTranlator.translate(new Error("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY")))
      .toStrictEqual(new InvariantError("tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"));
    expect(DomainErrorTranlator.translate(new Error("REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION")))
      .toStrictEqual(new InvariantError("tidak dapat membuat user baru karena tipe data tidak sesuai"));
    expect(DomainErrorTranlator.translate(new Error("REGISTER_USER.USERNAME_LIMIT_CHAR")))
      .toStrictEqual(new InvariantError("tidak dapat membuat user baru karena karakter username melebihi batas limit"));
    expect(DomainErrorTranlator.translate(new Error("REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER")))
      .toStrictEqual(new InvariantError("tidak dapat membuat user baru karena username mengandung karakter terlarang"));
  });

  it("should return original error when error message is not needed to translate", () => {
    // Arrange
    const error = new Error("some_error_message");

    // Action
    const translatedError = DomainErrorTranlator.translate(error);

    expect(translatedError).toStrictEqual(error);
  });
});
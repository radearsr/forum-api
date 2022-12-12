const pool = require("../../database/postgres/pool");
const UserTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const container = require("../../container");
const createServer = require("../createServer");

describe("when POST /users", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UserTableTestHelper.cleanTable();
  });

  it("should response 201 and peristed user", async () => {
    // Arrange
    const requestPayload = {
      username: "radea",
      password: "iloveyou",
      fullname: "Radea Surya R",
    };
    const server = await createServer(container);

    // Action
    const response = await server.inject({
      method: "POST",
      url: "/users",
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(201);
    expect(responseJson.status).toEqual("success");
    expect(responseJson.data.addedUser).toBeDefined();
  });

  it("should response 400 when request payload not contain needed property", async () => {
    // Arrange
    const requestPayload = {
      fullname: "Radea Surya",
      password: "iloveyou",
    };
    const server = await createServer(container);

    // Action
    const response = await server.inject({
      method: "POST",
      url: "/users",
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual("fail");
    expect(responseJson.message).toEqual("tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada");
  });

  it("should response 400 when request payload not meet data type specification", async () => {
    // Arrange
    const requestPayload = {
      username: "radea",
      password: "iloveyou",
      fullname: ["Radea Surya R"],
    };
    const server = await createServer(container);

    // Action
    const response = await server.inject({
      method: "POST",
      url: "/users",
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual("fail");
    expect(responseJson.message).toEqual("tidak dapat membuat user baru karena tipe data tidak sesuai");
  });

  it("should response 400 when username more than 50 character", async () => {
    // Arrange
    const requestPayload = {
      username: "radeasuryaramandhitaradeasuryaramandhitaradeasuryaramandhitaradeasuryaramandhitaradeasuryaramandhita",
      password: "iloveyou",
      fullname: "Radea Surya R",
    };
    const server = await createServer(container);

    // Action
    const response = await server.inject({
      method: "POST",
      url: "/users",
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual("fail");
    expect(responseJson.message).toEqual("tidak dapat membuat user baru karena karakter username melebihi batas limit");
  });

  it("should response 400 when username contain restricted character", async () => {
    // Arrange
    const requestPayload = {
      username: "radea surya",
      password: "iloveyou",
      fullname: "Radea Surya R",
    };
    const server = await createServer(container);

    const response = await server.inject({
      method: "POST",
      url: "/users",
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual("fail");
    expect(responseJson.message).toEqual("tidak dapat membuat user baru karena username mengandung karakter terlarang");
  });

  it("should response 400 when username unavailable", async () => {
    // Arrange
    await UserTableTestHelper.addUser({ username: "radea" });
    const requestPayload = {
      username: "radea",
      fullname: "Radea Surya R",
      password: "iloveyou",
    };
    const server = await createServer(container);

    // Action
    const response = await server.inject({
      method: "POST",
      url: "/users",
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual("fail");
    expect(responseJson.message).toEqual("username tidak tersedia");
  });
});

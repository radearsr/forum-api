const Hapi = require("@hapi/hapi");
const ClientError = require("../../Commons/exceptions/ClientError");
const DomainErrorTranslator = require("../../Commons/exceptions/DomainErrorTranslator");
const users = require("../../Interfaces/http/api/users");
const authentications = require("../../Interfaces/http/api/authentications");

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      const translateError = DomainErrorTranslator.translate(response);

      if (translateError instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: translateError.message,
        });
        newResponse.code(translateError.statusCode);
        return newResponse;
      }

      if (!translateError.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: "error",
        message: "terjadi kegagalan pada server kami",
      });

      newResponse.code(500);
      console.log(newResponse);
      return newResponse;
    }

    return h.continue;
  });

  return server;
};

module.exports = createServer;

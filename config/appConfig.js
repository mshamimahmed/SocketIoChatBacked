let appConfig = {};
appConfig.port = 8081;
appConfig.env = "dev";
appConfig.db = {
  // uri: "mongodb://127.0.0.1:27017/todoAppDB",
  // uri:"mongodb+srv://admin:<password>@cluster0.1cib5.mongodb.net/todoAppDB"
  uri:"mongodb+srv://admin:Password123@cluster0.1cib5.mongodb.net/test"
};
appConfig.aviVersion = "/api/v1";
appConfig.allowedCorsOrigin = "*";

module.exports = {
  port: appConfig.port,
  environment: appConfig.env,
  apiVersion: appConfig.aviVersion,
  dataBase: appConfig.db.uri,
  allowedOrigin: appConfig.allowedCorsOrigin,
};

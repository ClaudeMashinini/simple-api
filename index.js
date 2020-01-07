const { Client } = require("pg");

const client = new Client({
  user: "user",
  password: "pass",
  host: "localhost",
  database: "db",
  port: 5432
});

client
  .connect()
  .then(() => console.log("Successful Connection"))
  .catch(e => console.log)
  .finally(() => client.end());

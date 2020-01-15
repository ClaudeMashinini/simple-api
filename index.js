const { Client } = require("pg");
const client = new Client({
  user: "user",
  password: "pass",
  host: "localhost",
  port: 5433,
  database: "db"
});

CREATE TABLE visitors(
  id serial PRIMARY KEY,
  visitor_name VARCHAR(50) NOT NULL,
  visitor_age integer NOT NULL,
  date_of_visit VARCHAR (50) NOT NULL,
  time_of_visit VARCHAR(50) NOT NULL,
  assistant_name VARCHAR (50) not null,
  visit_comments VARCHAR (100) not null
)

async function showAll() {
  try {
    await client.connect();
    const { rows } = await client.query("select * from visitors");
    console.table(rows);
  } catch (error) {
    console.error();
  }
}

async function viewVisitor(id) {
  try {
    await client.connect();
    const { rows } = await client.query("select * from visitors where id=$1", [id]);
    console.table(rows)
  } catch (error) {
    console.error();
  }
}

async function deleteAll() {
  try {
    await client.connect();
    await client.query("DELETE * from visitors");
  } catch (error) {
    console.error();
  }
}
async function deleteVisitor(id) {
  try {
    await client.connect();
    const { rows } = await client.query("DELETE from visitors where id=$1", [id]);
    console.table(rows)
  } catch (error) {
    console.error();
  }
}

async function addVisitor(visitor_name, visitor_age, date_of_visit, time_of_visit, assistant_name, visit_comments) {
  try {
    await client.connect();
    await client.query("INSERT INTO visitors( visitor_name, visitor_age, date_of_visit, time_of_visit, assistant_name, visit_comments) VALUES($1,$2,$3,$4,$5,$6);", [visitor_name, visitor_age, date_of_visit, time_of_visit, assistant_name, visit_comments])
    const { rows } = await client.query("select * from visitors");
    console.table(rows);
  }
}
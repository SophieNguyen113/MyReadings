const { pool } = require("./database.js");
const { languages } = require("../data/languages.js");

const createUsersTable = async () => {
  try {
    const createUsersTableQuery = `
      DROP TABLE IF EXISTS users;
      
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        githubid int NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        password VARCHAR(255),
        avatarUrl VARCHAR(500) NOT NULL,
        accessToken VARCHAR(512) NOT NULL,
        name VARCHAR(255)
      ); 
    `;
    await pool.query(createUsersTableQuery);
    console.log(`✅ Table users created successfully`);
  } catch (err) {
    console.log("❌ failed to createUsersTable");
    console.error(err);
  }
};

const createLanguagesTable = async () => {
  try {
    const createLanguagesTableQuery = `
      DROP TABLE IF EXISTS languages;

      CREATE TABLE IF NOT EXISTS languages (
        id SERIAL PRIMARY KEY,
        language_code VARCHAR(255) NOT NULL,
        language_name VARCHAR(255) NOT NULL
      );
    `;
    await pool.query(createLanguagesTableQuery);
    console.log(`✅ Table languages created successfully`);
  } catch (err) {
    console.log("❌ failed to createLanguagesTable");
    console.error(err);
  }
};

const insertLanguages = async () => {
  try {
    const insertLanguagesQuery = `
      INSERT INTO languages (language_code, language_name)
      VALUES ($1, $2)
    `;
    for (const language of languages) {
      await pool.query(insertLanguagesQuery, [language.code, language.name]);
    }
    console.log(`✅ Languages inserted successfully`);
  } catch (err) {
    console.log("❌ failed to insertLanguages");
    console.error(err);
  }
};

const dropTable = async () => {
  try {
    const dropTableQuery = `
      DROP TABLE IF EXISTS languages;
      DROP TABLE IF EXISTS users;
    `;

    await pool.query(dropTableQuery);
    console.log(`✅ Tables dropped successfully`);
  } catch (err) {
    console.log("❌ failed to dropTable");
    console.error(err);
  }
}

const setup = async () => {
  await dropTable();
  await createUsersTable();
  await createLanguagesTable();
  await insertLanguages();
};

setup();

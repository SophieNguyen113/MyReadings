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

const createBook_Table = async () => {
  try {
    const createBookTableQuery = `
      DROP TABLE IF EXISTS Book;
      
      CREATE TABLE IF NOT EXISTS Book (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        genre VARCHAR(100),
        description TEXT,
      ); 
    `;
    await pool.query(createBookTableQuery);
    console.log(`✅ Table Book created successfully`);
  } catch (err) {
    console.log("❌ Failed to create Book Table");
    console.error(err);
  }
};

const createUser_Book_Table = async () => {
  try {
    const createUser_BookTableQuery = `
      DROP TABLE IF EXISTS User_Book;
      
      CREATE TABLE IF NOT EXISTS User_Book (
        user_id INT NOT NULL,
        book_id INT NOT NULL,
        rating INT CHECK (rating BETWEEN 1 AND 5),
        review TEXT,
        reading_status VARCHAR(20) CHECK (reading_status IN ('reading','finished','to-read)),
        book_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_read DATE,
        PRIMARY KEY (user_id, book_id),
        FOREIGN KEY (user_id) REFERENCES "User"(id) on DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES book(id) on DELETE CASCADE
      );
    `;
    await pool.query(createUser_BookTableQuery);
    console.log(`✅ Table User_book created successfully`);
  } catch (err) {
    console.log("❌ failed to create User_BookTable");
    console.error(err);
  }
};


const createCollection_Table = async () => {
  try {
    const createCollection_TableQuery = `
      DROP TABLE IF EXISTS Collection;
      
      CREATE TABLE IF NOT EXISTS Collection (
        id INT SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
    await pool.query(createCollection_TableQuery);
    console.log(`✅ Collection Table created successfully`);
  } catch (err) {
    console.log("❌ Failed to create Collection Table");
    console.error(err);
  }
};

const createColection_Book_Table = async () => {
  try {
    const createCollection_Book_TableQuery = `
      DROP TABLE IF EXISTS Collection_Book;
      
      CREATE TABLE IF NOT EXISTS Collection_Book (
        collection_id INT NOT NULL,
        book_id INT NOT NULL,
        PRIMARY KEY (collection_id, book_id),
        FOREIGN KEY (collection_id) REFERENCES Collection(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE
      );
    `;
    await pool.query(createCollection_Book_TableQuery);
    console.log(`✅ Table Collection_Book created successfully`);
  } catch (err) {
    console.log("❌ Failed to create Collection_Book table");
    console.error(err);
  }
};

const dropTable = async () => {
  try {
    const dropTableQuery = `
      DROP TABLE IF EXISTS languages;
      DROP TABLE IF EXISTS users;

      DROP TABLE IF EXISTS Book;
      DROP TABLE IF EXISTS User_Book;
      DROP TABLE IF EXISTS Collection;
      DROP TABLE IF EXISTS Collection_Book;
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

  await createBook_Table();
  await createUser_Book_Table();
  await createCollection_Table();
  await createColection_Book_Table();
};

setup();
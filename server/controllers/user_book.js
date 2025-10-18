const { pool } = require("../config/database.js");

const getUserLibrary = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const query = `
      SELECT * FROM user_library WHERE user_id = $1
    `;
    
    const books = await pool.query(query, [req.user.id]);
    return res.status(200).json({ books: books.rows });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Error retrieving books" });
  }
};

const addUserLibraryBook = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, author, genre, description, rating, reading_status } = req.body;

    const insertQuery = `
      INSERT INTO user_library (user_id, title, author, genre, description, rating, reading_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const newBook = await pool.query(insertQuery, [req.user.id, title, author, genre, description, rating, reading_status]);
    return res.status(201).json({ book: newBook.rows[0] });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Error adding book" });
  }
};

const updateUserLibraryBook = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const { book_id } = req.params;
    const { title, author, genre, description, rating, reading_status } = req.body;

    const updateQuery = `
      UPDATE user_library
      SET title = $1, author = $2, genre = $3, description = $4, rating = $5, reading_status = $6
      WHERE id = $7 AND user_id = $8
      RETURNING *
    `;
    
    const updatedBook = await pool.query(updateQuery, [title, author, genre, description, rating, reading_status, book_id, req.user.id]);
    if (updatedBook.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json({ book: updatedBook.rows[0] });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Error updating book" });
  }
};

const deleteUserLibraryBook = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const { book_id } = req.params;
    const deleteQuery = `DELETE FROM user_library WHERE id = $1 AND user_id = $2 RETURNING *`;
    const deletedBook = await pool.query(deleteQuery, [book_id, req.user.id]);
    
    if (deletedBook.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Error deleting book" });
  }
};

const toggleFavoriteBook = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { book_id } = req.params;

    const selectQuery = `SELECT favorite FROM user_library WHERE id = $1 AND user_id = $2`;
    const result = await pool.query(selectQuery, [book_id, req.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    const currentFavorite = result.rows[0].favorite;
    const newFavorite = !currentFavorite;

    const updateQuery = `
      UPDATE user_library
      SET favorite = $1
      WHERE id = $2 AND user_id = $3
      RETURNING *
    `;

    const updated = await pool.query(updateQuery, [newFavorite, book_id, req.user.id]);

    return res.status(200).json({ book: updated.rows[0] });
  } catch (err) {
    console.error("Error toggling favorite:", err.message);
    return res.status(500).json({ error: "Error toggling favorite status" });
  }
};

module.exports = { getUserLibrary, addUserLibraryBook, updateUserLibraryBook, deleteUserLibraryBook, toggleFavoriteBook };

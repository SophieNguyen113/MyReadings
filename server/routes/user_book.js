const express = require("express");
const {
  getUserLibrary,
  addUserLibraryBook,
  updateUserLibraryBook,
  deleteUserLibraryBook,
  toggleFavoriteBook,
} = require("../controllers/user_book.js");

const router = express.Router();

router.route("/").get(getUserLibrary).post(addUserLibraryBook);
router.route("/:book_id").put(updateUserLibraryBook).delete(deleteUserLibraryBook);
router.route("/:book_id/favorite").post(toggleFavoriteBook);

module.exports = router;

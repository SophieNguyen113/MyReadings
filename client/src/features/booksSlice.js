import { createSlice } from "@reduxjs/toolkit";

const categories = [
  "Fiction",
  "Science",
  "Arts",
  "Business",
  "Biography",
  "Literary",
  "Books"
];

const initialState = {
  googleBooks: [],
  filteredGoogleBooks: [],
  favoriteBooks: [],
  selectedCategory: "All",
  searchQuery: "bestsellers",
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setGoogleBooks: (state, action) => {
      state.googleBooks = action.payload;
      state.filteredGoogleBooks = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setFilteredGoogleBooks: (state) => {
      const filteredBooksByCategory =
        !state.selectedCategory || state.selectedCategory === "All"
          ? state.googleBooks
          : state.selectedCategory === "Others"
          ? state.googleBooks.filter((book) =>
              !book?.volumeInfo?.categories?.some((category) =>
                categories.some((definedCategory) =>
                  category.toLowerCase().includes(definedCategory.toLowerCase())
                )
              )
            )
          : state.googleBooks.filter((book) =>
              book?.volumeInfo?.categories?.some((category) =>
                category.toLowerCase().includes(state.selectedCategory.toLowerCase())
              )
            );
      state.filteredGoogleBooks = filteredBooksByCategory;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setGoogleBooks,
  setSelectedCategory,
  setFilteredGoogleBooks,
  setSearchQuery,
} = booksSlice.actions;

export default booksSlice.reducer;

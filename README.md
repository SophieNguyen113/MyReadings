# MyReadings - A Personalized Book Tracking Website

## Please email nnguyen177@student.gsu.edu for the `.env` keys

## Team
- **Sophie Nguyen** 
- **Khue Nguyen** 
- **Natalie Hwang** 

## Description
MyReadings is a web application designed for book enthusiasts to track and manage their reading journey. Users can:
- List books they have read
- Create a collection of favorite books
- Manage their book lists through CRUD (Create, Read, Update, Delete) operations
- Utilize an LLM-powered chatbot for book consulting, recommendations, summaries, and discussions

## Tech Stack
- **Frontend:** React.js, JavaScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, SQL
- **External APIs:** Google Books API, DeepSeek-R1

## Data Sources
- **Google Books API:** Fetches book metadata (title, author, description, genres, etc.)
- **User Input:** Users manually add ratings, reviews, reading statuses, and create collections
- **LLM Chatbot Data:** AI-driven insights and recommendations for book summaries and discussions

## Installation & Setup
### **Backend Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/SophieNguyen113/MyReadings.git
   cd MyReadings
   ```
2. Install dependencies:
   ```sh
   cd server
   npm install
   ```
3. Create `.env` file:
   ```sh
   PG_CONNECTION_STRING=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   SESSION_SECRET=
   DEEPSEEK_API_KEY=
   ```
4. Start the backend server:
   ```sh
   npm run start
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create `.env` file:
   ```sh
   VITE_API_KEY=
   ```
4. Start the frontend server:
   ```sh
   npm run dev
   ```

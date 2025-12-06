import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function Chatbot({ api_url }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);
  const [savedBooks, setSavedBooks] = useState([]);
  const messagesEndRef = useRef(null);
  
  // Fetch user preferences and saved books on component mount
  useEffect(() => {
    // Fetch saved books from the database
    const fetchSavedBooks = async () => {
      try {
        const res = await fetch(`${api_url}/api/books`, {
          credentials: "include",
        });
        const data = await res.json();
        
        if (data.books && data.books.length > 0) {
          setSavedBooks(data.books);
          
          // Create user preferences based on saved books
          const genres = [...new Set(data.books.map(book => book.genre).filter(Boolean))];
          const authors = [...new Set(data.books.map(book => book.author).filter(Boolean))];
          
          setUserPreferences({
            readBooks: data.books,
            favoriteGenres: genres,
            favoriteAuthors: authors
          });
        } else {
          // Fallback to mock data if no saved books
          setUserPreferences({
            readBooks: [
              { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', rating: 4.5, genre: 'Classic' },
              { title: '1984', author: 'George Orwell', rating: 5, genre: 'Dystopian' },
              { title: 'To Kill a Mockingbird', author: 'Harper Lee', rating: 4.8, genre: 'Classic' }
            ],
            favoriteGenres: ['Classic', 'Science Fiction', 'Mystery'],
            favoriteAuthors: ['George Orwell', 'Jane Austen', 'Stephen King']
          });
        }
      } catch (error) {
        console.error("Failed to fetch saved books:", error);
        // Fallback to mock data on error
        setUserPreferences({
          readBooks: [
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', rating: 4.5, genre: 'Classic' },
            { title: '1984', author: 'George Orwell', rating: 5, genre: 'Dystopian' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', rating: 4.8, genre: 'Classic' }
          ],
          favoriteGenres: ['Classic', 'Science Fiction', 'Mystery'],
          favoriteAuthors: ['George Orwell', 'Jane Austen', 'Stephen King']
        });
      }
    };
    
    fetchSavedBooks();
    
    // Add welcome message with example prompts
    setMessages([
      { 
        role: 'assistant', 
        content: 'Hello! I\'m your book recommendation assistant. I can suggest books based on your reading history, provide summaries, or discuss themes. How can I help you today?\n\nTry asking me:\n1. "Suggest books based on my reading history"\n2. "Give me a summary of \'1984\' by George Orwell"\n3. "What are books similar to \'The Great Gatsby\'?"\n4. "Recommend mystery books I might enjoy"\n5. "What are the major themes in \'To Kill a Mockingbird\'?"' 
      }
    ]);
  }, [api_url]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to search books using Google Books API
  const searchBooks = async (query) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };

  // Function to send message to DeepSeek API using OpenAI SDK
  const sendToDeepSeek = async (prompt) => {
    try {
      const payload = {
        messages: [
          {
            role: 'system',
            content: `You are a helpful book recommendation assistant. You have access to the user's actual saved books:
            ${JSON.stringify(savedBooks, null, 2)}
            
            User preferences derived from their reading history:
            ${JSON.stringify(userPreferences, null, 2)}
            
            When recommending books, consider the user's saved books, favorite genres, authors, and previously read books.
            Be specific and provide thoughtful recommendations with brief explanations of why they might enjoy each book.
            For book summaries and theme discussions, be concise but informative.
            If the user has no saved books, mention that and provide general recommendations.`
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      };

      const res = await fetch(`${api_url}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        // Bubble up status for specific handling (e.g., 402)
        const text = await res.text();
        const err = new Error(text || 'Chat proxy error');
        err.status = res.status;
        throw err;
      }

      const data = await res.json();
      return data.choices?.[0]?.message?.content || 'No content returned from model';
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);

      if (error.status === 402) {
        let fallbackResponse = "I'm sorry, but there seems to be an issue with the API account balance. This is a demo application and the API credits may have been exhausted.\n\n";

        if (savedBooks && savedBooks.length > 0) {
          const bookTitles = savedBooks.map(book => book.title || "Unknown Title").join(", ");
          const genres = [...new Set(savedBooks.map(book => book.genre).filter(Boolean))];
          const authors = [...new Set(savedBooks.map(book => book.author).filter(Boolean))];

          fallbackResponse += `Based on your saved books (${bookTitles}), `;

          if (genres.length > 0) {
            fallbackResponse += `and your interest in ${genres.join(", ")} genres, `;
          }

          fallbackResponse += "you might enjoy:\n\n";

          if (genres.includes("Classic") || authors.includes("F. Scott Fitzgerald")) {
            fallbackResponse += "- 'Pride and Prejudice' by Jane Austen\n";
          }

          if (genres.includes("Dystopian") || authors.includes("George Orwell")) {
            fallbackResponse += "- 'Brave New World' by Aldous Huxley\n";
          }

          if (genres.includes("Mystery") || authors.includes("Stephen King")) {
            fallbackResponse += "- 'The Silent Patient' by Alex Michaelides\n";
          }

          fallbackResponse += "- 'The Catcher in the Rye' by J.D. Salinger\n";
        } else {
          fallbackResponse += "Since you don't have any saved books yet, here are some general recommendations:\n\n";
          fallbackResponse += "- 'To Kill a Mockingbird' by Harper Lee\n";
          fallbackResponse += "- '1984' by George Orwell\n";
          fallbackResponse += "- 'The Great Gatsby' by F. Scott Fitzgerald\n";
          fallbackResponse += "- 'Pride and Prejudice' by Jane Austen\n";
        }

        return fallbackResponse;
      }

      return 'Sorry, I encountered an error while processing your request. Please try again.';
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Check if the query is about a specific book
    let bookData = [];
    if (input.toLowerCase().includes('summary') || input.toLowerCase().includes('similar to')) {
      const bookTitle = input.match(/'([^']+)'|"([^"]+)"/);
      if (bookTitle) {
        const query = bookTitle[1] || bookTitle[2];
        bookData = await searchBooks(query);
      }
    }
    
    // Prepare prompt with additional context if needed
    let enhancedPrompt = input;
    if (bookData.length > 0) {
      const bookInfo = bookData[0].volumeInfo;
      enhancedPrompt += `\n\nAdditional book information: ${JSON.stringify(bookInfo, null, 2)}`;
    }
    
    // Get response from DeepSeek
    const response = await sendToDeepSeek(enhancedPrompt);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-amber-900">Book Recommendation Chatbot</h1>
        
          {/* Messages container */}
          <div className="h-[60vh] overflow-y-auto mb-6 p-6 bg-white rounded-xl shadow-md border border-amber-100">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 p-4 rounded-xl border ${
                message.role === 'user' 
                  ? 'bg-amber-50 border-amber-200 ml-auto max-w-[80%]' 
                  : 'bg-white border-amber-100 max-w-[80%]'
              }`}
            >
              <p className="text-sm font-semibold mb-2 text-amber-900">
                {message.role === 'user' ? 'You' : 'Book Assistant'}
              </p>
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => <p className="text-amber-900/90 text-sm mb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-amber-900" {...props} />,
                  em: ({node, ...props}) => <em className="italic text-amber-900" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-amber-900" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc ml-6 text-amber-900" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1 text-amber-900" {...props} />
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ))}
          
          {isLoading && (
            <div className="bg-white border border-amber-100 p-4 rounded-xl max-w-[80%] mb-4 shadow-sm">
              <p className="text-sm font-semibold mb-2 text-amber-900">Book Assistant</p>
              <p className="text-amber-900/80">Thinking...</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
          </div>
        
          {/* Input form */}
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for recommendations, summaries, or themes..."
              className="flex-1 p-4 bg-white text-amber-900 placeholder:text-amber-400 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-amber-600 text-white rounded-xl shadow-sm hover:bg-amber-700 disabled:bg-amber-300"
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
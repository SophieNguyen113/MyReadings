export default function Homepage({api_url}) {
  const AUTH_URL_LOGIN = `${api_url}/auth/github`;
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-amber-900 mb-6 leading-tight">
            Your Personal Library, Simplified
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
            MyReadings is your companion for tracking every book you read, discovering your next favorite story, 
            and connecting with a community of passionate readers. Build your digital bookshelf today.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-12">
            <a
              href={AUTH_URL_LOGIN}
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="relative z-10">Start Your Reading Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </a>
            
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-amber-900 text-lg font-semibold rounded-xl border-2 border-amber-900 hover:bg-amber-50 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              Learn More
            </button>
          </div>
          </div>
          </section>
      
      {/* Feature Section */}
            <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-900 mb-4">Why Use MyReadings?</h2>
          <p className="text-xl text-gray-600">Everything you need to cultivate your reading life</p>
        </div>

        {/* Container 1 - Record Reads */}
        <div className="flex items-center justify-between mb-24 gap-12">
          <div className="w-1/2">
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img src="./record.jpg" alt="Record Your Reads" className="w-full h-96 object-cover opacity-90" />
            </div>
          </div>
          <div className="w-1/2 pl-8">
            <div className="inline-block px-4 py-2 bg-orange-200 text-orange-900 rounded-full text-sm font-semibold mb-4">
              📖 ORGANIZE
            </div>
            <h3 className="text-4xl font-bold text-amber-900 mb-6">Record Reads</h3>
            <p className="text-lg text-amber-800 leading-relaxed mb-6">
              Create your personal reading sanctuary. Log your current reads, finished favorites, and wishlist titles. 
              Organize with custom shelves, track your reading journey, and watch your literary world grow—all in one
              welcoming space.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-amber-800">
                <svg className="w-6 h-6 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Custom reading lists and shelves
              </li>
              <li className="flex items-center text-amber-800">
                <svg className="w-6 h-6 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Track reading progress and dates
              </li>
              <li className="flex items-center text-amber-800">
                <svg className="w-6 h-6 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Reading statistics and insights
              </li>
            </ul>
          </div>
        </div>

        {/* Container 2 - Discover Interests */}
        <div className="flex items-center justify-between mb-24 gap-12">
          <div className="w-1/2 pr-8">
            <div className="inline-block px-4 py-2 bg-amber-200 text-amber-900 rounded-full text-sm font-semibold mb-4">
              🔍 DISCOVER
            </div>
            <h3 className="text-4xl font-bold text-amber-900 mb-6">Find Your Community</h3>
            <p className="text-lg text-amber-800 leading-relaxed mb-6">
              Connect with fellow book lovers who share your taste in stories. Our thoughtful recommendation system 
              helps you discover not just your next great read, but readers who love the same cozy corners of literature. 
              Join book clubs, share recommendations, and build lasting friendships.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-amber-800">
                <svg className="w-6 h-6 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Thoughtful reader matching
              </li>
              <li className="flex items-center text-amber-800">
                <svg className="w-6 h-6 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Personalized book recommendations
              </li>
              <li className="flex items-center text-amber-800">
                <svg className="w-6 h-6 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Cozy book club gatherings
              </li>
            </ul>
          </div>
          <div className="w-1/2">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img src="./review.jpg" alt="Discover Interests" className="w-full h-96 object-cover opacity-90" />
            </div>
          </div>
        </div>

        {/* Container 3 - Share Thoughts */}
        <div className="flex items-center justify-between gap-12">
          <div className="w-1/2">
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img src="./thoughts.jpg" alt="Share Your Thoughts" className="w-full h-96 object-cover opacity-90" />
            </div>
          </div>
          <div className="w-1/2 pl-8">
            <div className="inline-block px-4 py-2 bg-yellow-200 text-yellow-900 rounded-full text-sm font-semibold mb-4">
              💬 ENGAGE
            </div>
            <h3 className="text-4xl font-bold text-amber-900 mb-6">Share Your Love for Stories</h3>
            <p className="text-lg text-amber-800 leading-relaxed mb-6">
              Your reading journey deserves to be shared. Write heartfelt reviews, share your favorite quotes, 
              and engage in warm conversations with fellow readers. Whether you're gushing about a new favorite 
              or recommending a hidden gem, this is your cozy space to connect.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-amber-800">
                <svg className="w-6 h-6 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Share thoughtful book reviews
              </li>
              <li className="flex items-center text-amber-800">
                <svg className="w-6 h-6 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Join warm, welcoming discussions
              </li>
              <li className="flex items-center text-amber-800">
                <svg className="w-6 h-6 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Connect with fellow book lovers
              </li>
            </ul>
          </div>
        </div>
      </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-amber-900 to-orange-900 py-20 mt-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Start Reading?</h2>
          <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto">
            Join thousands of readers who are already tracking their literary journeys with MyReadings. 
            Sign up today and get personalized book recommendations instantly.
          </p>
          <a
            href={AUTH_URL_LOGIN}
            className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-amber-900 text-xl font-bold rounded-xl shadow-2xl hover:bg-amber-50 transform hover:-translate-y-1 transition-all duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>Join with GitHub - It's Free</span>
          </a>
        </div>
      </section>

    </div>
  );
}

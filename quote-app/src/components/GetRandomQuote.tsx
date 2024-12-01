import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firestore instance

type Quote = {
  id: string;
  quote: string;
  author: string;
};

const RandomQuote: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quotes"));
        const quotesList: Quote[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Quote[];
        setQuotes(quotesList);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching quotes: ", e);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  
  const getRandomQuote = (): Quote | null => {
    if (quotes.length === 0) {
      return null; 
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const handleGetRandomQuote = () => {
    const quote = getRandomQuote();
    setRandomQuote(quote);
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Random Quote Generator</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading quotes...</p>
      ) : randomQuote ? (
        <div className="text-center ">
          <p className="text-lg font-medium text-gray-700">{randomQuote.quote}</p>
          <small className="text-sm text-gray-500">- {randomQuote.author}</small>
        </div>
      ) : (
        <p className="text-center text-gray-500">No quote selected yet.</p>
      )}

      <div className="mt-4 text-center">
        <button
          onClick={handleGetRandomQuote}
          className="px-6 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-300"
        >
          Get Random Quote
        </button>
      </div>
    </div>
  );
};

export default RandomQuote;

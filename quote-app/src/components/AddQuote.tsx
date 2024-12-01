// AddQuote.tsx
import React, { useState } from "react";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this imports your Firebase config


type Quote = {
    id: string;
    quote: string;
    author: string;
  };
type AddQuoteProps = {
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
};

const AddQuote: React.FC<AddQuoteProps> = ({ quotes, setQuotes }) => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [minLengthError, setMinLengthError] = useState(false);

  const handleAddQuote = async () => {
    if (quote.length < 20) {
      setMinLengthError(true);
      return;
    }
    setMinLengthError(false);

    try {
      const docRef = await addDoc(collection(db, "quotes"), { quote, author });
      setQuotes([...quotes, { id: docRef.id, quote, author }]); // Append new quote to state
      setQuote(""); // Reset inputs
      setAuthor("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleEditQuote = async (id: string, newQuote: string) => {
    if (newQuote.length < 20) {
      alert("Quote must be at least 20 characters.");
      return;
    }
    const quoteRef = doc(db, "quotes", id);
    await updateDoc(quoteRef, { quote: newQuote });

    setQuotes(
      quotes.map((q) => (q.id === id ? { ...q, quote: newQuote } : q))
    );
  };

  const handleDeleteQuote = async (id: string) => {
    const quoteRef = doc(db, "quotes", id);
    await deleteDoc(quoteRef);
    setQuotes(quotes.filter((q) => q.id !== id));
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Add a Quote</h1>
      <input
        type="text"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Enter quote"
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter author"
        className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {minLengthError && <p className="text-red-500 text-sm">Quote must be at least 20 characters.</p>}
      <button
        onClick={handleAddQuote}
        className="w-full py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-300"
      >
        Add Quote
      </button>

      <div className="mt-10 w-full max-w-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quotes</h2>
        <ul className="space-y-4">
          {quotes.length > 0 ? (
            quotes.map((q) => (
              <li key={q.id} className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
                <p className="text-lg font-medium text-gray-700">{q.quote}</p>
                <small className="text-sm text-gray-500">- {q.author}</small>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={() =>
                      handleEditQuote(q.id, prompt("Edit quote:", q.quote) || q.quote)
                    }
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuote(q.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No quotes available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddQuote;

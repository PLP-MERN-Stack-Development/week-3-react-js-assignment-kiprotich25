import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Posts() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.quotable.io/quotes?page=${page}&limit=${limit}`);
        setQuotes(res.data.results);
        setError('');
      } catch (err) {
        setError('Failed to load quotes.');
      }
      setLoading(false);
    };

    fetchQuotes();
  }, [page]);

  // Filter quotes by search term
  const filteredQuotes = quotes.filter(q =>
    q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Inspirational Quotes</h1>

      <input
        type="text"
        placeholder="Search by content or author..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4">
          {filteredQuotes.map((q) => (
            <li key={q._id} className="bg-white p-4 shadow rounded">
              <p className="text-gray-800 italic">"{q.content}"</p>
              <p className="text-right text-gray-600 mt-2">— {q.author}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}



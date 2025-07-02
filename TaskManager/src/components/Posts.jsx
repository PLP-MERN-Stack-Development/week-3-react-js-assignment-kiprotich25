import React, { useEffect, useState } from 'react';

export default function Posts() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Liberation stands');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&language=eng&page=${page}`
      );
      if (!response.ok) throw new Error('Error fetching books');
      const data = await response.json();
      setBooks(data.docs.slice(0, limit)); // Slice to limit results
    } catch (err) {
      setError(`Failed to load books.`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBooks();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 English Books (Open Library)</h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search for books..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="text-yellow-500">{error}</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.key} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold">{book.title}</h2>
              <p className="text-gray-600">
                {book.author_name ? book.author_name.join(', ') : 'Unknown author'}
              </p>
              {book.cover_i && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="mt-2 w-32"
                />
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

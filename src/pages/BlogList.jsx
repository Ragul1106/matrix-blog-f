import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    load();
  }, [page, search]);

  async function load() {
    const filters = {};
    if (search) filters.search = search;
    const data = await getPosts(page, filters);
    setPosts(data.results);
    setMeta({ count: data.count, next: data.next, prev: data.previous });
  }

  return (
    <div className="px-4 md:px-12 py-8">
      <div className="flex mb-6 justify-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
          className="border p-3 rounded-xl w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {p.featured_image && (
              <img
                src={p.featured_image.startsWith('http') ? p.featured_image : `http://localhost:8000${p.featured_image}`}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="font-bold text-xl mb-2">
                <Link to={`/blog/${p.slug}`} className="hover:text-indigo-600 transition">
                  {p.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                By {p.author} - {p.published_at ? new Date(p.published_at).toLocaleDateString() : 'Draft'}
              </p>
              <Link
                to={`/blog/${p.slug}`}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Pagination meta={meta} page={page} setPage={setPage} />
    </div>
  );
}

import React, { useEffect, useState, useContext } from 'react';
import { getPosts, deletePost } from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // safe flag to prevent setting state after unmount

    async function load() {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getPosts(1, { author__id: user.id });
        if (isMounted) setPosts(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [user]);

  async function onDelete(slug) {
    if (!confirm('Delete post?')) return;
    try {
      await deletePost(slug);
      const data = await getPosts(1, { author__id: user.id });
      setPosts(data.results);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) return <div className="text-center py-10 text-gray-500">Loading user...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-800">Your Posts</h2>
        <Link
          to="/create"
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
        >
          New Post
        </Link>
      </div>

      {loading && <div className="text-center text-gray-500">Loading posts...</div>}

      <div className="grid gap-6">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 duration-300 flex justify-between items-center"
          >
            <div>
              <div className="font-bold text-lg text-indigo-800 hover:text-purple-700 transition-colors duration-300">
                {p.title}
              </div>
              <div className={`text-sm font-medium ${p.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
                {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
              </div>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/edit/${p.slug}`}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md transition-all duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(p.slug)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, getCommentsForPost, createComment } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    load();
  }, [slug]);

  async function load() {
    const p = await getPost(slug);
    setPost(p);
    const c = await getCommentsForPost(slug);
    setComments(c);
  }

  async function submit(e) {
    e.preventDefault();
    if (!user) return alert('Login to comment');
    await createComment({ post: post.id, content });
    setContent('');
    const c = await getCommentsForPost(slug);
    setComments(c);
  }

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Featured Image */}
      {post.featured_image && (
        <img
          src={post.featured_image.startsWith('http') ? post.featured_image : `http://localhost:8000${post.featured_image}`}
          alt={post.title}
          className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
      <div className="text-gray-500 mb-6">
        By {post.author.username} — {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
      </div>

      <div className="prose max-w-full mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

      <hr className="my-6" />

      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      <div>
        {comments.length === 0 && <div className="text-gray-500">No comments yet</div>}
        {comments.map((c) => (
          <div key={c.id} className="border rounded-xl p-4 mb-3 hover:shadow-md transition-shadow">
            <div className="font-bold mb-1">{c.author.username}</div>
            <div>{c.content}</div>
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={submit} className="mt-6 space-y-3">
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Write a comment..."
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transform transition">
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-4 text-gray-500">Please log in to add a comment.</div>
      )}
    </div>
  );
}

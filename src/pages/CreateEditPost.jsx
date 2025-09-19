import React, { useState, useEffect } from 'react';
import { createPost, getPost, updatePost } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateEditPost() {
  const { slug } = useParams();
  const isEdit = !!slug;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [featured_image, setFeaturedImage] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const p = await getPost(slug);
        setTitle(p.title);
        setContent(p.content);
        setStatus(p.status);
      })();
    }
  }, [slug]);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('status', status);
    if (featured_image) fd.append('featured_image', featured_image);
    try {
      if (isEdit) {
        await updatePost(slug, fd);
      } else {
        await createPost(fd);
      }
      nav('/dashboard');
    } catch (e) {
      alert('Error saving post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-[1.01] duration-300">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800">{isEdit ? 'Edit Post' : 'Create Post'}</h2>
        <form onSubmit={submit} className="space-y-4">
          {/* Title */}
          <div className="relative">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=" "
              className="peer w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <label className="absolute left-3 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-purple-500 peer-focus:text-sm transition-all">
              Title
            </label>
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          {/* Featured Image */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Featured Image</label>
            <input
              type="file"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
              className="w-full p-2 border rounded-lg file:bg-indigo-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:hover:bg-indigo-600 transition-all cursor-pointer"
            />
          </div>

          {/* Content */}
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            rows={12}
            placeholder="Write your post content..."
          />

          {/* Submit */}
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
            {isEdit ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

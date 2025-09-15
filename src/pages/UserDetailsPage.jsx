import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../api/userApi';

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser(id)
      .then(setUser)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!user) return <div className="p-4">User not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{user.username} <span className="text-gray-500">({user.email})</span></h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700"
          onClick={() => window.open(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:9090'}/users/${id}`, '_blank')}
        >
          View Details (Backend)
          {/* this view is not needed */}
        </button>
      </div>
      <div className="flex gap-4 mb-6">
        <Link to={`/users/${id}/labels`} className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">View Labels</Link>
        <Link to={`/users/${id}/passwords`} className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">View Passwords</Link>
      </div>
      {/* You can add more user info or quick stats here */}
    </div>
  );
}

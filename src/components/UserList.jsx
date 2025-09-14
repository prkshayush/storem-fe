import { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser } from '../api/userApi';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [creating, setCreating] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCreating(true);
    try {
      await createUser(form);
      setForm({ username: '', email: '', password: '' });
      fetchUsers();
    } catch (e) {
      setError(e.message);
    }
    setCreating(false);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-white p-4 rounded shadow">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700"
          disabled={creating}
        >
          {creating ? 'Creating...' : 'Add User'}
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="flex justify-between items-center border p-2 rounded bg-white shadow">
              <span>{user.username} ({user.email})</span>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

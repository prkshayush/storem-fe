import { useEffect, useState } from 'react';
import { getPasswords, createOrUpdatePassword, deletePassword } from '../api/passwordApi';

export default function PasswordList() {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ username: '', password: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [visible, setVisible] = useState({}); // { [id]: true/false }

  const fetchPasswords = async () => {
    setLoading(true);
    try {
      const data = await getPasswords();
      setPasswords(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCreating(true);
    try {
      await createOrUpdatePassword(form);
      setForm({ username: '', password: '', description: '' });
      fetchPasswords();
    } catch (e) {
      setError(e.message);
    }
    setCreating(false);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this password entry?')) return;
    try {
      await deletePassword(id);
      fetchPasswords();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Passwords</h2>
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
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700"
          disabled={creating}
        >
          {creating ? 'Saving...' : 'Add/Update Password'}
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          {passwords.map(pw => (
            <li key={pw.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border p-2 rounded bg-white shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold">{pw.username}</span>
                {pw.description && <span className="text-gray-500">({pw.description})</span>}
                <span className="ml-2">
                  <input
                    type={visible[pw.id] ? 'text' : 'password'}
                    value={pw.password}
                    readOnly
                    className="border p-1 rounded bg-gray-100 w-40 text-center select-all"
                  />
                  <button
                    type="button"
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700"
                    onClick={() => setVisible(v => ({ ...v, [pw.id]: !v[pw.id] }))}
                  >
                    {visible[pw.id] ? 'Hide' : 'Show'}
                  </button>
                </span>
              </div>
              <button
                onClick={() => handleDelete(pw.id)}
                className="mt-2 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700"
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

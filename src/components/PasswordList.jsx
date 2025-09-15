import { useEffect, useState } from 'react';
import { getPasswords, createOrUpdatePassword, deletePassword } from '../api/passwordApi';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { MdDelete } from 'react-icons/md';

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
    <div className="p-4 w-full mx-auto">
  <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-white p-4 rounded shadow w-1/4 mx-auto">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded w-full"
        />
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-black px-4 py-2 text-sm rounded-3xl shadow hover:bg-blue-700"
            disabled={creating}
          >
            {creating ? 'Saving...' : 'Add/Update Password'}
          </button>
        </div>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {passwords.map(pw => (
            <div key={pw.id} className="flex border p-4 rounded-xl bg-white shadow h-full items-center">
              <div className="flex flex-col gap-2">
                <p className="text-gray-500"><span className='text-sm font-light'>Title: </span>{pw.title}</p>
                <p className="font-semibold"> <span className='text-sm font-light'>Username: </span>{pw.username}</p>
                <div className="flex items-center">
                  <input
                    type={visible[pw.id] ? 'text' : 'password'}
                    value={pw.password}
                    readOnly
                    className="border p-1 rounded bg-gray-100 w-40 text-center select-all"
                  />
                  <button
                    type="button"
                    className="ml-2 text-black px-3 py-2 rounded-2xl shadow"
                    onClick={() => setVisible(v => ({ ...v, [pw.id]: !v[pw.id] }))}
                  >
                    {visible[pw.id] ? <FaEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => handleDelete(pw.id)}
                  className="text-black text-2xl px-4 py-2 rounded-3xl shadow cursor-pointer hover:bg-gray-100"
                  title="Delete password"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

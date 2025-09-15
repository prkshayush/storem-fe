import { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser } from '../api/userApi';
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

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
  <div className="p-4 w-full mx-auto">
      <div className='w-1/4 mx-auto'>
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-black px-4 py-2 text-sm rounded-3xl shadow hover:bg-blue-700"
            disabled={creating}
          >
            {creating ? 'Creating...' : <div className='flex items-center justify-center'><FaPlus /><FaUser /></div>}
          </button>
        </div>
      </form>

      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map(user => (
            <div key={user.id} className="flex flex-col justify-between border p-4 rounded-xl bg-white shadow h-full">
              <div className='flex-1 flex flex-col justify-center'>
                <p><span className='text-sm font-light'>Username:</span> {user.username} </p>
                <p><span className='text-sm font-light'>Email:</span> {user.email}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-black text-2xl px-4 py-2 rounded-3xl shadow cursor-pointer hover:bg-gray-100"
                  title="Delete user"
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

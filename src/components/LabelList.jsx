import { useEffect, useState } from 'react';
import { getLabels, createLabel, deleteLabel } from '../api/labelApi';

export default function LabelList() {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [creating, setCreating] = useState(false);

  const fetchLabels = async () => {
    setLoading(true);
    try {
      const data = await getLabels();
      setLabels(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCreating(true);
    try {
      await createLabel(form);
      setForm({ name: '', description: '' });
      fetchLabels();
    } catch (e) {
      setError(e.message);
    }
    setCreating(false);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this label?')) return;
    try {
      await deleteLabel(id);
      fetchLabels();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Labels</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-white p-4 rounded shadow">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Label Name"
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700"
          disabled={creating}
        >
          {creating ? 'Creating...' : 'Add Label'}
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          {labels.map(label => (
            <li key={label.id} className="flex justify-between items-center border p-2 rounded bg-white shadow">
              <span>{label.name} {label.description && <span className="text-gray-500">({label.description})</span>}</span>
              <button
                onClick={() => handleDelete(label.id)}
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

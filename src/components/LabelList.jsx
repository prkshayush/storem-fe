import { useEffect, useState } from 'react';
import { getLabels, createLabel, deleteLabel } from '../api/labelApi';
import { BiSolidLabel } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

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
    <div className="p-4 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Labels</h2>
  <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-white p-4 rounded shadow w-1/4 mx-auto">
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-black px-3 py-2 text-sm rounded-3xl shadow hover:bg-blue-400"
            disabled={creating}
          >
            {creating ? 'Creating...' : <div className='flex items-center text-3xl'><BiSolidLabel /></div>}
          </button>
        </div>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {labels.map(label => (
            <div key={label.id} className="flex flex-col justify-between border p-4 rounded-xl bg-white shadow h-full">
              <div className='flex-1 flex flex-col justify-center mb-4'>
              <p><span className='text-sm font-light'>Label name: </span>{label.name}</p> 
              <p className="text-gray-800"><span className='text-sm font-light'>Description: </span>{label.description}</p>
              </div>
              <div className="flex justify-end">
              <button
                onClick={() => handleDelete(label.id)}
                className="text-black text-2xl px-4 py-2 rounded-3xl shadow cursor-pointer hover:bg-gray-100"
              >
                <MdDelete />
              </button>
              </div>
            </div>
          ))}
          </div>
        </ul>
      )}
      
    </div>
  );
}

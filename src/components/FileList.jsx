import { useEffect, useState } from 'react';
import { getFiles, createFiles, deleteFile } from '../api/fileApi';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ fileName: '', fileType: '', storagePath: '', fileSize: '' });
  const [creating, setCreating] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const data = await getFiles();
      setFiles(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCreating(true);
    try {
      await createFiles([
        {
          ...form,
          fileSize: Number(form.fileSize) || 0,
        },
      ]);
      setForm({ fileName: '', fileType: '', storagePath: '', fileSize: '' });
      fetchFiles();
    } catch (e) {
      setError(e.message);
    }
    setCreating(false);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this file?')) return;
    try {
      await deleteFile(id);
      fetchFiles();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Files</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-white p-4 rounded shadow">
        <input
          name="fileName"
          value={form.fileName}
          onChange={handleChange}
          placeholder="File Name"
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="fileType"
          value={form.fileType}
          onChange={handleChange}
          placeholder="File Type"
          className="border p-2 rounded w-full"
        />
        <input
          name="storagePath"
          value={form.storagePath}
          onChange={handleChange}
          placeholder="Storage Path"
          className="border p-2 rounded w-full"
        />
        <input
          name="fileSize"
          value={form.fileSize}
          onChange={handleChange}
          placeholder="File Size (in mb)"
          type="number"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700"
          disabled={creating}
        >
          {creating ? 'Adding...' : 'Add File'}
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          {files.map(file => (
            <li key={file.id} className="flex justify-between items-center border p-2 rounded bg-white shadow">
              <span>{file.fileName} <span className="text-gray-500">({file.fileType})</span></span>
              <button
                onClick={() => handleDelete(file.id)}
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

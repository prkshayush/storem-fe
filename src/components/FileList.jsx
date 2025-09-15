import { useEffect, useState } from 'react';
import { getFiles, createFiles, deleteFile } from '../api/fileApi';
import { FaFolderPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

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
    <div className="p-4 max-w-full mx-auto">
  <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-white p-4 rounded shadow w-1/4 mx-auto">
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-black px-3 py-2 text-sm rounded-3xl shadow hover:bg-blue-700"
            disabled={creating}
          >
            {creating ? 'Adding...' : <div className='flex items-center text-2xl'><FaFolderPlus /></div>}
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
          {files.map(file => (

            <li key={file.id} className="flex justify-between items-center border p-2 rounded bg-white shadow">
              <div className='flex-1 flex-col justify-center font-bold'>
              <p><span className='text-sm font-light'>File name:</span> {file.fileName} </p>
              <p className="text-gray-800 uppercase"><span className='text-sm lowercase font-light'>File type:</span> {file.fileType}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(file.id)}
                  className="text-black text-2xl px-4 py-2 rounded-3xl shadow cursor-pointer hover:bg-gray-100"
                  title="Delete file"
                >
                  <MdDelete />
                </button>
              </div>
            </li>
          ))}

          </div>
        </ul>
      )}
    </div>
  );
}

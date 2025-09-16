import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../api/userApi';
import { getUserFiles } from '../api/userFIlesApi';
import { getUserLabels } from '../api/userLabelsApi';
import { getUserPasswords } from '../api/userPasswordsApi';
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [labels, setLabels] = useState(null);
  const [labelsLoading, setLabelsLoading] = useState(false);
  const [labelsError, setLabelsError] = useState(null);
  const [showLabels, setShowLabels] = useState(false);
  const [files, setFiles] = useState(null);
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState(null);
  const [showFiles, setShowFiles] = useState(false);
  const [passwords, setPasswords] = useState(null);
  const [passwordsLoading, setPasswordsLoading] = useState(false);
  const [passwordsError, setPasswordsError] = useState(null);
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    getUser(id)
      .then(setUser)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShowFiles = async () => {
    if (showFiles) {
      setShowFiles(false);
      return;
    }
    setFilesLoading(true);
    setFilesError(null);
    setShowFiles(true);
    try {
      const data = await getUserFiles(id);
      setFiles(data);
    } catch (e) {
      setFilesError(e.message);
    }
    setFilesLoading(false);
  };

  const handleShowLabels = async () => {
    if (showLabels) {
      setShowLabels(false);
      return;
    }
    setLabelsLoading(true);
    setLabelsError(null);
    setShowLabels(true);
    try {
      const data = await getUserLabels(id);
      setLabels(data);
    } catch (e) {
      setLabelsError(e.message);
    }
    setLabelsLoading(false);
  };

  const handleShowPasswords = async () => {
    if (showPasswords) {
      setShowPasswords(false);
      return;
    }
    setPasswordsLoading(true);
    setPasswordsError(null);
    setShowPasswords(true);
    try {
      const data = await getUserPasswords(id);
      setPasswords(data);
    } catch (e) {
      setPasswordsError(e.message);
    }
    setPasswordsLoading(false);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!user) return <div className="p-4">User not found.</div>;

  return (
    <div className="w-full mx-auto px-6 py-3">
      <div className="flex flex-col items-start justify-between p-4 mb-2">
        <div className="flex items-center justify-between">
          <span className='text-gray-800 text-2xl'><CiUser /></span>
          <p className="text-xl font-bold">: {user.username} </p>
        </div>
        <div className="flex items-center justify-between">
          <span className='text-gray-800 text-2xl'><MdEmail /></span>
          <p className="text-xl font-bold">: {user.email} </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={handleShowFiles} className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">
          {showFiles ? 'Hide Files' : 'Show Files'}
        </button>
        <button onClick={handleShowLabels} className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">
          {showLabels ? 'Hide Labels' : 'Show Labels'}
        </button>
        <button onClick={handleShowPasswords} className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">
          {showPasswords ? 'Hide Passwords' : 'Show Passwords'}
        </button>
      </div>


      {showLabels && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Labels</h3>
          {labelsLoading ? <div>Loading...</div> : labelsError ? <div className="text-red-600">{labelsError}</div> : (
            labels && labels.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {labels.map(label => (
                  <div key={label.id} className="border p-4 rounded-xl bg-white shadow h-full flex flex-col justify-center">
                    <span className="font-bold text-lg mb-1">{label.name}</span>
                    <span className="text-gray-500">{label.description}</span>
                  </div>
                ))}
              </div>
            ) : <div className="text-gray-500">No labels found.</div>
          )}
        </div>
      )}

      {showFiles && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Files</h3>
          {filesLoading ? <div>Loading...</div> : filesError ? <div className="text-red-600">{filesError}</div> : (
            files && files.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {files.map(file => (
                  <div key={file.id} className="border p-4 rounded-xl bg-white shadow h-full flex flex-col justify-center">
                    <span className="font-bold text-lg mb-1">{file.fileName}</span>
                    <span className="text-gray-500">{file.fileType}</span>
                  </div>
                ))}
              </div>
            ) : <div className="text-gray-500">No files found.</div>
          )}
        </div>
      )}

      {showPasswords && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Passwords</h3>
          {passwordsLoading ? <div>Loading...</div> : passwordsError ? <div className="text-red-600">{passwordsError}</div> : (
            passwords && passwords.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {passwords.map(pw => (
                  <div key={pw.id} className="border p-4 rounded-xl bg-white shadow h-full flex flex-col justify-center">
                    <span className="font-bold text-lg mb-1">{pw.title || ''}</span>
                    <span className="text-gray-500">{pw.username}</span>
                  </div>
                ))}
              </div>
            ) : <div className="text-gray-500">No passwords found.</div>
          )}
        </div>
      )}

    </div>
  );
}

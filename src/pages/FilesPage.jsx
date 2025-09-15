import { Link } from 'react-router-dom';
import FileList from '../components/FileList';
import Navbar from '../components/Navbar';

export default function FilesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Files" />
      <main className="p-4">
        <FileList />
      </main>
    </div>
  );
}

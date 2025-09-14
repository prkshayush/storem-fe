import { Link } from 'react-router-dom';
import PasswordList from '../components/PasswordList';

export default function PasswordsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-blue-600 text-white text-2xl font-bold flex justify-between items-center">
        <span>Passwords</span>
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">Home</button>
        </Link>
      </header>
      <main className="p-4">
        <PasswordList />
      </main>
    </div>
  );
}

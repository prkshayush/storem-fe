import { Link } from 'react-router-dom';
import UserList from '../components/UserList';

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-blue-600 text-white text-2xl font-bold flex justify-between items-center">
        <span>Users</span>
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">Home</button>
        </Link>
      </header>
      <main className="p-4">
        <div className="mb-6 space-x-4">
          <Link to="/labels">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">View Labels</button>
          </Link>
          <Link to="/passwords">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">View Passwords</button>
          </Link>
        </div>
        <UserList />
      </main>
    </div>
  );
}

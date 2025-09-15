import { Link } from 'react-router-dom';
import UserList from '../components/UserList';
import Navbar from '../components/Navbar';

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Users" />
      <main className="p-4">
        <div className="mb-6 space-x-4">
          <Link to="/labels">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">Labels</button>
          </Link>
          <Link to="/passwords">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">Passwords</button>
          </Link>
        </div>
        <UserList />
      </main>
    </div>
  );
}

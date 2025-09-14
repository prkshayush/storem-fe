import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">StoreM Dashboard</h1>
      <div className="space-x-4">
        <Link to="/users">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">View Users</button>
        </Link>
        <Link to="/files">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow hover:bg-blue-700">View Files</button>
        </Link>
      </div>
    </div>
  );
}

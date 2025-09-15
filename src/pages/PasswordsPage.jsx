
import PasswordList from '../components/PasswordList';
import Navbar from '../components/Navbar';

export default function PasswordsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Passwords" />
      <main className="p-4">
        <PasswordList />
      </main>
    </div>
  );
}

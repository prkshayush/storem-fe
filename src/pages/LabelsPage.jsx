import { Link } from 'react-router-dom';
import LabelList from '../components/LabelList';
import Navbar from '../components/Navbar';

export default function LabelsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Labels" />
      <main className="p-4">
        <LabelList />
      </main>
    </div>
  );
}

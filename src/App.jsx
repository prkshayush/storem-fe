import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UsersPage from './pages/UsersPage';
import FilesPage from './pages/FilesPage';
import LabelsPage from './pages/LabelsPage';
import PasswordsPage from './pages/PasswordsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/labels" element={<LabelsPage />} />
        <Route path="/passwords" element={<PasswordsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
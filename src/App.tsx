import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './pages/Main';
import Storage from './pages/Storage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/storage" element={<Storage />} />
    </Routes>
  );
}

export default App;

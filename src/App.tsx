import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './pages/Main';
import { Storage } from './pages/Storage';
import { Filter } from './pages/Filter';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/storage" element={<Storage />} />
      <Route path="/filter" element={<Filter />} />
    </Routes>
  );
}

export default App;

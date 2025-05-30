import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './pages/Main';
import { Storage } from './pages/Storage';
import { Filter } from './pages/Filter';
import { DialogDemo } from './pages/DialogDemo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/storage" element={<Storage />} />
      <Route path="/dialog" element={<DialogDemo />} />
      <Route path="/filter" element={<Filter />} />
    </Routes>
  );
}

export default App;

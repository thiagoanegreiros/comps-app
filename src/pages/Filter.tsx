import { useEffect, useState } from 'react';
import { AutoFilterDropdown } from '../components/AutoFilterDropdown';
import { useNavigate } from 'react-router-dom';

interface Country {
  name: string;
  code: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export const Filter = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const countries: Country[] = [
    { name: 'Brazil', code: 'BR' },
    { name: 'Canada', code: 'CA' },
    { name: 'Germany', code: 'DE' },
    { name: 'Argentina', code: 'AR' },
    { name: 'France', code: 'FR' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Auto Filter Demo
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Countries</h2>
          <AutoFilterDropdown
            items={countries}
            labelKey="name"
            valueChange={item => console.log('Selected country:', item)}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <AutoFilterDropdown
            items={users}
            labelKey="name"
            valueChange={item => console.log('Selected user:', item)}
          />
        </div>
      </div>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded shadow cursor-pointer hover:bg-red-600 transition"
        onClick={() => navigate('/')}
      >
        Home
      </button>
    </div>
  );
};

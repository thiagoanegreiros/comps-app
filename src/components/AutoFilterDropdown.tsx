import { useState, useMemo, useEffect } from 'react';

interface AutoFilterDropdownProps<T> {
  items: T[];
  labelKey: keyof T;
  valueChange: (selectedItem: T) => void;
}

export function AutoFilterDropdown<T>({
  items,
  labelKey,
  valueChange,
}: AutoFilterDropdownProps<T>) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      setShowList(true);
    }
  }, [debouncedQuery]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const label = String(item[labelKey]);
      return label.toLowerCase().includes(debouncedQuery.toLowerCase());
    });
  }, [items, debouncedQuery, labelKey]);

  const highlightMatch = (text: string) => {
    if (!debouncedQuery) return text;
    const regex = new RegExp(`(${debouncedQuery})`, 'ig');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, idx) =>
          regex.test(part) ? <b key={idx}>{part}</b> : part,
        )}
      </>
    );
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Type to filter..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {showList && (
        <ul className="max-h-60 overflow-y-auto transition-opacity duration-300 ease-in-out">
          {filteredItems.map((item, idx) => {
            const label = String(item[labelKey]);
            return (
              <li
                key={idx}
                onClick={() => {
                  valueChange(item);
                  setQuery(label);
                  setShowList(false);
                }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition"
              >
                {highlightMatch(label)}
              </li>
            );
          })}
          {filteredItems.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

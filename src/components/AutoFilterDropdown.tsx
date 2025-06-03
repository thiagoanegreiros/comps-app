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
  const [inputValue, setInputValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(inputValue);
      setShowList(inputValue.length > 0);
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);

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
          part.toLowerCase() === debouncedQuery.toLowerCase() ? (
            <b key={idx}>{part}</b>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    valueChange(item);
    setInputValue('');
    setDebouncedQuery('');
    setShowList(false);
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
      {selectedItem && (
        <div className="mb-2 p-2 bg-gray-100 rounded">
          Selected: {String(selectedItem[labelKey])}
        </div>
      )}
      <input
        type="text"
        placeholder="Type to filter..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {showList && (
        <ul className="max-h-60 overflow-y-auto transition-opacity duration-300 ease-in-out">
          {filteredItems.map((item, idx) => {
            const label = String(item[labelKey]);
            return (
              <li
                key={idx}
                onClick={() => handleSelect(item)}
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

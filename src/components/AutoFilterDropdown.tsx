import { useState, useMemo } from "react";

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
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const label = String(item[labelKey]);
      return label.toLowerCase().includes(query.toLowerCase());
    });
  }, [items, query, labelKey]);

  const highlightMatch = (text: string) => {
    const regex = new RegExp(`(${query})`, "ig");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, idx) =>
          regex.test(part) ? <b key={idx}>{part}</b> : part
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
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <ul className="max-h-60 overflow-y-auto">
        {filteredItems.map((item, idx) => {
          const label = String(item[labelKey]);
          return (
            <li
              key={idx}
              onClick={() => valueChange(item)}
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
    </div>
  );
}

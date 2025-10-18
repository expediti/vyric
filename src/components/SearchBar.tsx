import { useState } from "react";

const SearchBar = ({ autoFocus = false }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/?q=${encodeURIComponent(search.trim())}`; // implement real search if needed
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex border rounded">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search templates..."
        className="w-64 p-2 rounded-l bg-transparent outline-none"
        autoFocus={autoFocus}
      />
      <button type="submit" className="px-2 rounded-r bg-primary text-white">Search</button>
    </form>
  );
};
export default SearchBar;

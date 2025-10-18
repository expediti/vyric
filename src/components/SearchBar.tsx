import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <input
      type="text"
      className="border p-3 rounded w-full"
      placeholder="Search templates..."
      value={value}
      onChange={onChange}
    />
    <Search className="absolute left-2 top-2 h-5 w-5 text-muted-foreground" />
  </div>
);

export default SearchBar;

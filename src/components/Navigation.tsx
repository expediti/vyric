import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  // Keep your actual navigation menu here!

  return (
    <>
      <nav className="your-nav-class">
        <div className="your-menu-layout-class">
          {/* ...other nav links... */}
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="p-2"
          >
            <Search />
          </button>
        </div>
      </nav>
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-background rounded-lg p-6 w-full max-w-lg flex flex-col">
            <input
              autoFocus
              type="text"
              className="border p-3 rounded mb-4"
              placeholder="Search templates..."
              // If you want, add an onChange to update search on TemplateGrid globally.
            />
            <button
              className="mt-2 px-4 py-2 bg-primary rounded"
              onClick={() => setSearchOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

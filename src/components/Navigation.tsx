import { LogIn, UserPlus, User, LogOut, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Navigation = () => {
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <img src="/favicon.ico" alt="logo" className="w-8 h-8"/>
            VYRIC
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/editors" className="hover:text-primary transition-colors">Editors</Link>
            <Link to="/collections" className="hover:text-primary transition-colors">Collections</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          </div>
          <div className="flex items-center space-x-2">
            {/* Only add THIS LINE for search icon: */}
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search />
            </Button>
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={async () => {
                    await supabase.auth.signOut();
                    useNavigate()("/");
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-background rounded-lg p-6 w-full max-w-lg flex flex-col">
            <input
              autoFocus
              type="text"
              className="border p-3 rounded mb-4"
              placeholder="Search templates..."
            />
            <Button variant="secondary" onClick={() => setSearchOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

import { Instagram, Youtube, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo.jpg" 
                alt="VYRIC Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold text-xl">VYRIC</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your ultimate destination for free CapCut templates, trending presets, and viral video effects.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {/* TikTok Icon */}
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a 
                  href="https://tiktok.com/@vyric.live" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on TikTok"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.849-1.377-1.987-1.377-3.338h-2.895v14.542a3.47 3.47 0 11-2.895-3.415V9.423a6.359 6.359 0 00-2.895.604v2.895a3.47 3.47 0 110 6.94 3.47 3.47 0 01-3.47-3.47V2h2.895c0 1.351.528 2.489 1.377 3.338.849.849 1.987 1.377 3.338 1.377h2.895c0-1.351.528-2.489 1.377-3.338z"/>
                  </svg>
                </a>
              </Button>

              {/* Instagram Icon */}
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a 
                  href="https://instagram.com/vyric.live" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>

              {/* YouTube Icon */}
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a 
                  href="https://youtube.com/@vyric" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>

              {/* Twitter Icon */}
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a 
                  href="https://twitter.com/vyric_live" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>

              {/* GitHub Icon */}
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <a 
                  href="https://github.com/vyric" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Check our GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Templates */}
          <div>
            <h3 className="font-semibold mb-4">Templates</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/collections" className="text-muted-foreground hover:text-foreground transition-colors">
                  CapCut Templates
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-muted-foreground hover:text-foreground transition-colors">
                  Viral Templates
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-muted-foreground hover:text-foreground transition-colors">
                  Phonk Templates
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-muted-foreground hover:text-foreground transition-colors">
                  Instagram Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/editors" className="text-muted-foreground hover:text-foreground transition-colors">
                  Video Editors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  How to Use
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foregroun

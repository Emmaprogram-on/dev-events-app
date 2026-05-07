'use client';
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { useState, useRef, useEffect } from "react";
import { signOut } from "@/lib/action/user.actions";

type NavbarProps = {
  user: {
    name: string;
    email: string;
  } | null;
};

const Navbar = ({ user }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <nav>
        <div className="flex flex-row items-center gap-4">
          <Link href="/" className="logo">
            <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
            <p>CoddeConf</p>
          </Link>
          <SearchBar />
        </div>

        {/* Desktop links */}
        <ul className="max-sm:hidden">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>

          {user ? (
            <div className="nav-user-btn" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="nav-user-trigger"
              >
                <div className="nav-user-avatar">
                  {getInitials(user.name)}
                </div>
                <span className="nav-user-name">
                  {user.name.split(" ")[0]}
                </span>
                <span className={`nav-chevron ${dropdownOpen ? "open" : ""}`}>▼</span>
              </button>

              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-header">
                    <p className="nav-dropdown-name">{user.name}</p>
                    <p className="nav-dropdown-email">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="nav-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    View Profile
                  </Link>
                  <div className="nav-dropdown-divider" />
                  <form action={signOut}>
                    <button type="submit" className="nav-dropdown-item danger">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Sign Out
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <Link href="/sign-in">Sign In</Link>
          )}
        </ul>

        {/* Hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="menu-dropdown">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/events" onClick={() => setMenuOpen(false)}>Events</Link>
          {user ? (
            <form action={signOut}>
              <button type="submit" className="text-sm text-red-400">Sign Out</button>
            </form>
          ) : (
            <Link href="/sign-in" onClick={() => setMenuOpen(false)}>Sign In</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
'use client';
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav>
  {/* Logo always visible */}
  <div className="flex flex-row items-center gap-4">
    <Link href="/" className="logo">
      <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
      <p>DevEvents</p>
    </Link>
    <SearchBar />
  </div>

  {/* Desktop links - hidden on mobile */}
  <ul className="max-sm:hidden">
    <Link href="/">Home</Link>
    <Link href="/events">Events</Link>
    <Link href="/">Profile</Link>
  </ul>

  {/* Hamburger - mobile only */}
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
    <Link href="/" onClick={() => setMenuOpen(false)}>Profile</Link>
  </div>
)}
    </header>
  );
};

export default Navbar;

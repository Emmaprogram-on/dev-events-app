'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface SearchResult {
  title: string;
  slug: string;
  image: string;
}

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search - waits 300ms after user stops typing
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      setSearched(false);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setLoading(true);
      setSearched(false);
      try {
        const res = await fetch(`/api/events/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.events || []);
        setShowDropdown(true);
        setSearched(true);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  const handleResultClick = () => {
    setQuery("");
    setShowDropdown(false);
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="search-bar-wrapper" ref={containerRef}>
      {/* Input */}
      <div className="search-input-container">
        <Image src="/icons/search.svg" alt="search" width={16} height={16} className="search-icon opacity-50" style={{ background: 'transparent' }}/>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          placeholder="Search events..."
          className="search-input"
        />
        {loading && (
          <div className="search-spinner" />
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="search-dropdown">
          {results.length > 0 ? (
            results.map((event) => (
              <Link
                href={`/events/${event.slug}`}
                key={event.slug}
                className="search-result-item"
                onClick={handleResultClick}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  width={48}
                  height={36}
                  className="search-result-image"
                />
                <div className="search-result-info">
                  <p className="search-result-title">{event.title}</p>
                </div>
              </Link>
            ))
          ) : searched ? (
            <div className="search-no-results">
              <p>No results found for &quot;<span>{query}</span>&quot;</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
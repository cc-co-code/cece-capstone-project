import React from "react";
import useAppStore from "./store/useAppStore";
import Link from "next/link";

import {
  MagnifyingGlassIcon,
  UserIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  // Falls du den toggleLanguage später benötigst, aktiviere useAppStore
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const toggleLanguage = () => {
    console.log("Language toggled"); // Debug-Log, bis useAppStore verfügbar ist
  };

  return (
    <header className="header">
      <h1 className="header-logo">ALBY</h1>

      <div className="header-controls">
        <Link href="/login">
          <button className="header-profile">
            <UserIcon className="icon" height={24} width={24} />
          </button>
        </Link>

        <button className="header-language-toggle" onClick={toggleLanguage}>
          <GlobeAltIcon className="icon" height={24} width={24} />
        </button>

        <div className="header-search-container">
          <MagnifyingGlassIcon className="icon" height={24} width={24} />
          <input
            className="header-search"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

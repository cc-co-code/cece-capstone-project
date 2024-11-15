import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import {
  GlobeAltIcon,
  ArrowRightEndOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const { data: session } = useSession();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navigateAndCloseMenu = (path) => {
    router.push(path);
    setMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "de" : "en"));
    console.log(`Language changed to: ${language}`);
  };

  return (
    <header className="header">
      <Link href="/" className="header-logo">
        ALBY
      </Link>

      <button className="header-language-toggle" onClick={toggleLanguage}>
        <GlobeAltIcon className="icon" height={24} width={24} />
      </button>

      <button onClick={toggleMenu} className="menu-toggle">
        ☰
      </button>

      {menuOpen && (
        <nav className="dropdown-menu">
          <button onClick={() => navigateAndCloseMenu("/")}>Home</button>
          <button onClick={() => navigateAndCloseMenu("/community-stories")}>
            Community Stories
          </button>
          <button onClick={() => navigateAndCloseMenu("/about")}>About</button>
          <button onClick={() => navigateAndCloseMenu("/resources")}>
            Resources
          </button>

          {session ? (
            <>
              <button
                onClick={() => navigateAndCloseMenu("/profile")}
                className="dropdown-item"
              >
                <UserCircleIcon className="icon" height={18} width={18} />
                Profile
              </button>
              <button onClick={() => signOut()} className="dropdown-item">
                <ArrowRightEndOnRectangleIcon
                  className="icon"
                  height={18}
                  width={18}
                />
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className="dropdown-item">
              <ArrowRightEndOnRectangleIcon
                className="icon"
                height={18}
                width={18}
              />
              Login
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;

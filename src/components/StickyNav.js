import {
  GlobeAltIcon,
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="header-mobile">
      <Link href="/" className="header-logo">
        ALBY
      </Link>
      <nav className="header-nav">
        <Link href="/" className="header-link">
          Home
        </Link>
        <Link href="/resources" className="header-link">
          Resources
        </Link>
        <Link href="/community-stories" className="header-link">
          Community
        </Link>
        <Link href="/profile" className="header-link">
          <UserCircleIcon className="header-icon" />
        </Link>
      </nav>
      <div className="header-actions">
        <button className="header-language-toggle">
          <GlobeAltIcon className="header-icon" />
        </button>
        {session ? (
          <button onClick={() => signOut()} className="header-login">
            <ArrowRightEndOnRectangleIcon className="header-icon" />
            <span>Logout</span>
          </button>
        ) : (
          <button onClick={() => signIn()} className="header-login">
            <ArrowRightEndOnRectangleIcon className="header-icon" />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

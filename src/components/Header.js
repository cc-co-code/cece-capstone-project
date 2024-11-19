import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  HomeIcon,
  BookOpenIcon,
  UsersIcon,
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const NavLinks = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/resources", label: "Resources", icon: BookOpenIcon },
    { href: "/community-stories", label: "Community", icon: UsersIcon },
  ];

  const DesktopNavigation = () => (
    <div className="desktop-navigation">
      <Link href="/" className="header-logo">
        ALBY
      </Link>
      <nav className="nav-links">
        {NavLinks.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            <link.icon className="icon" height={18} width={18} />
            {link.label}
          </Link>
        ))}
        {session ? (
          <>
            <Link href="/profile" className="nav-link">
              <UserCircleIcon className="icon" height={18} width={18} />
              Profile
            </Link>
            <button onClick={() => signOut()} className="nav-link">
              <ArrowRightEndOnRectangleIcon
                className="icon"
                height={18}
                width={18}
              />
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className="nav-link">
            <ArrowRightEndOnRectangleIcon
              className="icon"
              height={18}
              width={18}
            />
            Login
          </button>
        )}
      </nav>
    </div>
  );

  return (
    <>
      <header className="header">
        {isMobile && (
          <Link href="/" className="header-logo">
            ALBY
          </Link>
        )}
        {!isMobile && <DesktopNavigation />}
      </header>

      {isMobile && (
        <nav className="mobile-navigation">
          {NavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="mobile-nav-link">
              <link.icon className="icon" height={24} width={24} />
              <span>{link.label}</span>
            </Link>
          ))}
          {session ? (
            <>
              <Link href="/profile" className="mobile-nav-link">
                <UserCircleIcon className="icon" height={24} width={24} />
                <span>Profile</span>
              </Link>
              <button onClick={() => signOut()} className="mobile-nav-link">
                <ArrowRightEndOnRectangleIcon
                  className="icon"
                  height={24}
                  width={24}
                />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className="mobile-nav-link">
              <ArrowRightEndOnRectangleIcon
                className="icon"
                height={24}
                width={24}
              />
              <span>Login</span>
            </button>
          )}
        </nav>
      )}
    </>
  );
}

export default Header;

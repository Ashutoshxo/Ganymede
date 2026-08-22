"use client";

import Link from "next/link";
import { accountNavigation, navigation } from "@/lib/content";
import { NavbarSearch } from "@/components/NavbarSearch";
import { GlobalPlayer, PlayerProvider } from "@/components/PlayerProvider";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <div className="shell">
        <aside className="sidebar" aria-label="Primary navigation">
          <Link href="/" className="brand">
            <span className="brand-mark">A</span>
            <span>
              <strong>Antares</strong>
              <small>Music</small>
            </span>
          </Link>

          <nav className="nav-group">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="nav-group muted-nav">
            {accountNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="main">
          <header className="topbar">
            <NavbarSearch />
            <div className="auth-actions">
              <Link href="/login">Log in</Link>
              <Link href="/register" className="button-dark">
                Sign up
              </Link>
            </div>
          </header>
          {children}
        </main>
        <GlobalPlayer />
      </div>
    </PlayerProvider>
  );
}

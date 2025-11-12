"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "../Theme/ThemeToggle";
import '../Theme/styles/theme.css'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-surface)/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        {/* Brand */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-(--color-text)"
        >
          TestPad
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLinks />
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile toggler */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-(--color-border) bg-(--color-surface) p-2 text-(--color-text) md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className={`h-5 w-5 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className={`h-5 w-5 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6l12 12M18 6l-12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden border-t border-(--color-border) bg-(--color-surface) ${open ? "block" : "hidden"}`}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <MobileLink href="/" onClick={() => setOpen(false)}>
              Home
            </MobileLink>
            <MobileLink href="/features" onClick={() => setOpen(false)}>
              Features
            </MobileLink>
            <MobileLink href="/pricing" onClick={() => setOpen(false)}>
              Pricing
            </MobileLink>
            <MobileLink href="/how-it-works" onClick={() => setOpen(false)}>
              How It Works
            </MobileLink>
            <MobileLink href="/about" onClick={() => setOpen(false)}>
              About Us
            </MobileLink>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLinks() {
  const link =
    "text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition";
  return (
    <div className="flex items-center gap-6">
      <Link className={link} href="/">
        Home
      </Link>
      <Link className={link} href="/features">
        Features
      </Link>
      <Link className={link} href="/pricing">
        Pricing
      </Link>
      <Link className={link} href="/how-it-works">
        How It Works
      </Link>
      <Link className={link} href="/about">
        About Us
      </Link>
      <Link
        className="ml-2 inline-flex items-center rounded-md bg-(--color-primary) px-3 py-2 text-sm font-medium text-(--color-primary-contrast) hover:saturate-110 hover:brightness-95"
        href="/universityregister"
      >
        Register
      </Link>
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md px-2 py-2 text-sm font-medium text-(--color-text) hover:bg-(--color-surface)/70"
    >
      {children}
    </Link>
  );
}

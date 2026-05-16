"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/promosi", label: "Promosi" },
  { href: "/artikel", label: "Artikel" },
  { href: "/tentang", label: "Tentang Kami" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDarkHero = pathname === "/" || pathname === "/tentang";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" id="nav-logo">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
            <Image 
              src="/logo.jpeg" 
              alt="Apotek Shaka Farma Logo" 
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-extrabold text-lg leading-tight ${scrolled ? "text-primary-700" : isDarkHero ? "text-white" : "text-primary-800"}`}>
              Shaka Farma
            </span>
            <span className={`text-[0.6rem] font-medium tracking-wider uppercase ${scrolled ? "text-primary-500" : isDarkHero ? "text-primary-100" : "text-primary-500"}`}>
              Apotek Terpercaya
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  id={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary-500 text-white shadow-md"
                      : scrolled || !isDarkHero
                      ? "text-text-primary hover:text-primary-700 link-underline"
                      : "text-white/90 hover:text-white link-underline"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled || !isDarkHero ? "text-primary-700" : "text-white"}`}
          aria-label="Toggle menu"
          id="nav-mobile-toggle"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-primary-100 animate-fade-in">
          <ul className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primary-500 text-white"
                        : "text-text-primary hover:bg-primary-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

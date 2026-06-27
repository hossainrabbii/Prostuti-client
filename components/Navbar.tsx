"use client";

import { useState } from "react";
import { ArrowRight, GraduationCap, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

function NavBar({ onEnroll }: { onEnroll: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { label: "কোর্সসমূহ", href: "#courses" },
    { label: "সুবিধাসমূহ", href: "#features" },
    { label: "কাদের জন্য", href: "#audience" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/*  LOGO AREA */}
        <Link href="#" className="flex items-center gap-2 group w-[220px] md:w-1/3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <TriangleCheckIcon className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-foreground">Shamim Vai</p>
            <p className="text-xs text-muted-foreground">জব প্রস্তুতি একাডেমি</p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION LINKS (CENTER) */}
        <nav className="hidden md:flex items-center gap-6  w-1/3 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* DESKTOP ACTIONS (RIGHT) */}
        <div className="hidden sm:flex items-center gap-2 w-1/3 justify-end">
          <Link
            href="/admin"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            অ্যাডমিন
          </Link>
          <Link href="/student-login">
            <Button variant="outline" className="gap-1.5 border-primary/30 text-primary hover:bg-primary/5">
              <LogIn className="h-4 w-4" /> লগইন
            </Button>
          </Link>
          <Button onClick={onEnroll} className="bg-gradient-primary shadow-md hover:opacity-95 gap-1">
            ভর্তি হোন <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROP-DOWN MENU */}
      {isOpen && (
        <div className="sm:hidden border-b border-border/60 bg-background/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
          
          {/* Mobile Nav Links */}
          <div className="space-y-1.5 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              অ্যাডমিন
            </Link>
          </div>
          
          {/* Mobile Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border/40">
            <Link href="/student-login" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="outline" className="w-full gap-1.5 border-primary/30 text-primary hover:bg-primary/5 justify-center">
                <LogIn className="h-4 w-4" /> লগইন
              </Button>
            </Link>
            <Button
              onClick={() => {
                onEnroll();
                setIsOpen(false);
              }}
              className="w-full bg-gradient-primary shadow-md hover:opacity-95 justify-center gap-1"
            >
              ভর্তি হোন <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

// Simple placeholder or mapping for GraduationCap to avoid missing icon errors
function TriangleCheckIcon(props: React.ComponentProps<typeof GraduationCap>) {
  return <GraduationCap {...props} />;
}

export default NavBar;
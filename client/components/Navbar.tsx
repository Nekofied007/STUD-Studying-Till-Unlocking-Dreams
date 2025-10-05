import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Process" },
  { id: "features", label: "Features" },
  { id: "vision", label: "Vision" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // Keep listener (no-op) for future use, but we won't change styles on scroll now
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-[2147483647] pointer-events-auto " +
        "supports-[backdrop-filter]:backdrop-blur-xl bg-black/30 border-b border-white/10 " +
        "shadow-[0_10px_30px_rgba(0,0,0,0.25)] h-16 md:h-20"
      }
    >
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div className="font-extrabold tracking-tight text-xl cursor-default select-none" aria-label="STUD · STUDYING TILL UNLOCKING DREAMS">
          <span className="text-primary">STUD</span>
          <span className="text-muted-foreground"> · STUDYING TILL UNLOCKING DREAMS</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#cta">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md shadow-blue-500/20">
              Start Your Journey
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";

const sectionIds = ["home", "work", "about", "process", "contact"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observers = sectionIds.map((id) => {
      const section = document.getElementById(id);
      if (!section) return null;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(id),
        { rootMargin: "-22% 0px -62% 0px", threshold: 0 },
      );
      observer.observe(section);
      return observer;
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menuButton = menuButtonRef.current;
    const menu = menuRef.current;
    const menuLinks = menu ? Array.from(menu.querySelectorAll<HTMLElement>("a[href]")) : [];
    const focusable = [menuButtonRef.current, ...menuLinks].filter(Boolean) as HTMLElement[];
    focusable[0]?.focus();
    document.body.classList.add("menu-is-open");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-is-open");
      (previouslyFocused ?? menuButton)?.focus();
    };
  }, [menuOpen]);

  return (
    <><header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link className="wordmark" href="/#home" aria-label="Hui-Shan Chen, home">
        Hui-Shan Chen
      </Link>

      <nav className="primary-navigation" aria-label="Primary navigation">
        <ul>
          {navigation.filter((item) => !item.external).map((item) => {
            const id = item.href.split("#")[1];
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={id && activeSection === id ? "is-active" : ""}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.external ? "Hui-Shan Chen on LinkedIn, opens in a new tab" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link
        className="header-linkedin"
        href="https://www.linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hui-Shan Chen on LinkedIn, opens in a new tab"
      >
        LinkedIn ↗
      </Link>

      <button
        ref={menuButtonRef}
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span>{menuOpen ? "Close" : "Menu"}</span>
      </button>

    </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => {
            const id = item.href.split("#")[1];
            return (
              <Link
                key={item.label}
                href={item.href}
                tabIndex={menuOpen ? 0 : -1}
                className={id && activeSection === id ? "is-active" : ""}
                onClick={() => setMenuOpen(false)}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <span className="mobile-menu-index">0{index + 1}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <p>UX Researcher & Product Designer<br />Taipei, Taiwan</p>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { ExternalLinkIcon, MenuIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { navigation } from "@/data/site";

const sectionIds = ["home", "work", "about", "process", "contact"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationTargetRef = useRef<string | null>(null);

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id?: string) => {
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    navigationTargetRef.current = id;
    setActiveSection(id);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      if (navigationTargetRef.current) {
        setActiveSection(navigationTargetRef.current);
        return;
      }

      const atPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;

      if (atPageBottom) {
        setActiveSection("contact");
        return;
      }

      const marker = window.scrollY + Math.min(window.innerHeight * 0.32, 280);
      let currentSection = "home";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) currentSection = id;
      });

      setActiveSection(currentSection);
    };

    const resumeScrollTracking = () => {
      navigationTargetRef.current = null;
      onScroll();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const scrollKeys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        "Home",
        "End",
        " ",
      ];
      if (scrollKeys.includes(event.key)) resumeScrollTracking();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", resumeScrollTracking, { passive: true });
    window.addEventListener("touchstart", resumeScrollTracking, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", resumeScrollTracking);
      window.removeEventListener("touchstart", resumeScrollTracking);
      window.removeEventListener("keydown", onKeyDown);
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
        HSC.
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
                  onClick={(event) => scrollToSection(event, id)}
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

      <button
        ref={menuButtonRef}
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen
          ? <XIcon aria-hidden="true" />
          : <MenuIcon aria-hidden="true" />}
      </button>

    </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigation.filter((item) => !item.external).map((item, index) => {
            const id = item.href.split("#")[1];
            const isExternal = item.external;
            return (
              <Link
                key={item.label}
                href={item.href}
                tabIndex={menuOpen ? 0 : -1}
                className={id && activeSection === id ? "is-active" : ""}
                onClick={(event) => {
                  scrollToSection(event, id);
                  setMenuOpen(false);
                }}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={isExternal ? "Open Hui-Shan Chen's LinkedIn profile in a new tab" : undefined}
              >
                <span className="mobile-menu-index">0{index + 1}</span>
                <span className="mobile-menu-label">
                  {item.label}
                  {isExternal ? <ExternalLinkIcon aria-hidden="true" /> : null}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

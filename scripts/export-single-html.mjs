import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceUrl = process.env.PORTFOLIO_URL ?? "http://localhost:3000";
const selectedProjects = [
  "personal-finance-activation",
  "collaborative-travel-planning",
  "healthcare-booking",
];

const mimeFor = (file) => {
  if (file.endsWith(".webp")) return "image/webp";
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
  if (file.endsWith(".svg")) return "image/svg+xml";
  if (file.endsWith(".woff2")) return "font/woff2";
  return "application/octet-stream";
};

const dataUri = async (file) => {
  const bytes = await fs.readFile(file);
  return `data:${mimeFor(file)};base64,${bytes.toString("base64")}`;
};

const fetchHtml = async (pathname) => {
  const response = await fetch(new URL(pathname, sourceUrl));
  if (!response.ok) throw new Error(`Could not load ${pathname}: ${response.status}`);
  return response.text();
};

const homeHtml = await fetchHtml("/");
const cssHref = homeHtml.match(/href="([^"]+\.css[^"]*)"/)?.[1];
if (!cssHref) throw new Error("Could not locate the compiled portfolio stylesheet.");
const cssResponse = await fetch(new URL(cssHref, sourceUrl));
if (!cssResponse.ok) throw new Error(`Could not load the compiled portfolio stylesheet: ${cssResponse.status}`);
let css = await cssResponse.text();
if (!css.includes(".site-header") || !css.includes(".hero")) {
  throw new Error("The compiled portfolio stylesheet response was incomplete.");
}

const fontNames = [...new Set([...css.matchAll(/url\(["']?\.\.\/media\/([^"'\)]+)["']?\)/g)].map((match) => match[1]))];
for (const fontName of fontNames) {
  const fontPath = path.join(root, ".next", "static", "media", fontName);
  const embeddedFont = `url("${await dataUri(fontPath)}")`;
  css = css
    .replaceAll(`url(../media/${fontName})`, embeddedFont)
    .replaceAll(`url("../media/${fontName}")`, embeddedFont)
    .replaceAll(`url('../media/${fontName}')`, embeddedFont);
}

const favicon = await dataUri(path.join(root, "public", "favicon.svg"));
const resume = encodeURIComponent(await fs.readFile(path.join(root, "public", "resume-placeholder.txt"), "utf8"));

const cleanHtml = (source) => source
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b(?=[^>]*(?:stylesheet|preload|modulepreload))[^>]*>/gi, "")
  .replace(/<div hidden="">[\s\S]*?<\/div>/i, "")
  .replace(/<!--\$-->|<!--\/\$-->|<!-- -->/g, "")
  .replace(/\sstyle="opacity:0;transform:translateY\(28px\)"/g, "")
  .replace(/\ssrcSet="[^"]*"/g, "")
  .replace(/\sdata-nimg="[^"]*"/g, "")
  .replaceAll('href="/resume-placeholder.txt"', `href="data:text/plain;charset=utf-8,${resume}"`)
  .replace(/<link rel="icon" href="[^"]*"\/>/, `<link rel="icon" href="${favicon}"/>`)
  .replace(/<html([^>]*)class="[^"]*"([^>]*)>/, "<html$1$2>")
  .replace(/\sstyle="color:transparent"/g, "")
  .replace("</head>", `<style>\n${css}\n:root{--font-montserrat:Montserrat,sans-serif}\n[data-standalone-reveal]{opacity:0;transform:translateY(24px);transition:opacity 550ms var(--ease-editorial),transform 550ms var(--ease-editorial)}\n[data-standalone-reveal].is-visible{opacity:1;transform:none}\n</style></head>`);

const mainScript = `<script>
(() => {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.menu-button');
  const menu = document.querySelector('#mobile-menu');
  const desktopLinks = [...document.querySelectorAll('.primary-navigation a[href^="#"]')];
  const mobileLinks = [...document.querySelectorAll('#mobile-menu a[href^="#"]')];
  const allInternalLinks = [...desktopLinks, ...mobileLinks];
  const sections = ['home','work','about','process','contact'].map(id => document.getElementById(id)).filter(Boolean);
  const menuIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>';
  const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  let navigationTarget = null;
  const setActiveLink = id => allInternalLinks.forEach(link =>
    link.classList.toggle('is-active', link.getAttribute('href') === '#' + id)
  );
  allInternalLinks.forEach(link => link.addEventListener('click', event => {
    const id = link.getAttribute('href')?.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    event.preventDefault();
    navigationTarget = id;
    setActiveLink(id);
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({behavior: reducedMotion ? 'auto' : 'smooth', block: 'start'});
    history.pushState(null, '', '#' + id);
  }));
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden','true');
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Open menu');
    button.innerHTML = menuIcon;
    document.body.classList.remove('menu-is-open');
    mobileLinks.forEach(link => link.tabIndex = -1);
  };
  const openMenu = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden','false');
    button.setAttribute('aria-expanded','true');
    button.setAttribute('aria-label','Close menu');
    button.innerHTML = closeIcon;
    document.body.classList.add('menu-is-open');
    mobileLinks.forEach(link => link.tabIndex = 0);
  };
  button?.addEventListener('click', () => button.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
    if (event.key !== 'Tab' || button?.getAttribute('aria-expanded') !== 'true') return;
    const focusable = [button, ...mobileLinks];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  const onScroll = () => {
    header?.classList.toggle('is-scrolled', scrollY > 24);
    if (navigationTarget) { setActiveLink(navigationTarget); return; }
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) { setActiveLink('contact'); return; }
    const marker = scrollY + Math.min(innerHeight * .32, 280);
    let current = 'home';
    sections.forEach(section => { if (section.offsetTop <= marker) current = section.id; });
    setActiveLink(current);
  };
  const resumeScrollTracking = () => { navigationTarget = null; onScroll(); };
  const scrollKeys = ['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '];
  addEventListener('wheel', resumeScrollTracking, {passive:true});
  addEventListener('touchstart', resumeScrollTracking, {passive:true});
  addEventListener('keydown', event => { if (scrollKeys.includes(event.key)) resumeScrollTracking(); });
  onScroll();
  addEventListener('scroll', onScroll, {passive:true});
  const revealTargets = [...document.querySelectorAll('.section-heading-row,.about-grid,.metric,.experience-row,.credentials-grid,.process-row,.methods-section,.capability-group,.contact-section .page-container')];
  revealTargets.forEach(target => target.setAttribute('data-standalone-reveal',''));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) revealTargets.forEach(target => target.classList.add('is-visible'));
  else {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), {threshold:.08});
    revealTargets.forEach(target => revealObserver.observe(target));
  }
})();
</script>`;

let mainHtml = cleanHtml(homeHtml)
  .replace(/href="\/#/g, 'href="#')
  .replace(/href="\/work\/([^"]+)"/g, 'href="case-$1.html"')
  .replace("</body>", `${mainScript}</body>`);

await fs.writeFile(path.join(root, "portfolio.html"), mainHtml);

for (const slug of selectedProjects) {
  let caseHtml = cleanHtml(await fetchHtml(`/work/${slug}`))
    .replace(/href="\/#(home|work|about|process|contact)"/g, 'href="portfolio.html#$1"')
    .replace(/href="\/work\/([^"]+)"/g, 'href="case-$1.html"')
    .replace("</body>", `<script>document.querySelector('.site-header')?.classList.add('is-scrolled')</script></body>`);
  await fs.writeFile(path.join(root, `case-${slug}.html`), caseHtml);
}

console.log(`Created portfolio.html and ${selectedProjects.length} standalone case-study pages.`);

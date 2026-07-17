import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceUrl = process.env.PORTFOLIO_URL ?? "http://localhost:3000";

const mimeFor = (file) => {
  if (file.endsWith(".webp")) return "image/webp";
  if (file.endsWith(".svg")) return "image/svg+xml";
  if (file.endsWith(".woff2")) return "font/woff2";
  return "application/octet-stream";
};

const dataUri = async (file) => {
  const bytes = await fs.readFile(file);
  return `data:${mimeFor(file)};base64,${bytes.toString("base64")}`;
};

const response = await fetch(`${sourceUrl}/`);
if (!response.ok) throw new Error(`Could not load ${sourceUrl}: ${response.status}`);
let html = await response.text();

const cssHref = html.match(/href="([^"]+\.css[^"]*)"/)?.[1];
if (!cssHref) throw new Error("Could not locate the compiled portfolio stylesheet.");
const cssResponse = await fetch(new URL(cssHref, sourceUrl));
let css = await cssResponse.text();

const fontNames = [...new Set([...css.matchAll(/url\(["']?\.\.\/media\/([^"'\)]+)["']?\)/g)].map((match) => match[1]))];
for (const fontName of fontNames) {
  const fontPath = path.join(root, ".next", "static", "media", fontName);
  const embeddedFont = `url("${await dataUri(fontPath)}")`;
  css = css
    .replaceAll(`url(../media/${fontName})`, embeddedFont)
    .replaceAll(`url("../media/${fontName}")`, embeddedFont)
    .replaceAll(`url('../media/${fontName}')`, embeddedFont);
}

const projectImages = {};
for (let index = 1; index <= 5; index += 1) {
  projectImages[index] = await dataUri(path.join(root, "public", "projects", `project-${index}.webp`));
}
const favicon = await dataUri(path.join(root, "public", "favicon.svg"));
const resume = encodeURIComponent(await fs.readFile(path.join(root, "public", "resume-placeholder.txt"), "utf8"));

html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b(?=[^>]*(?:stylesheet|preload|modulepreload))[^>]*>/gi, "")
  .replace(/<div hidden="">[\s\S]*?<\/div>/i, "")
  .replace(/<!--\$-->|<!--\/\$-->|<!-- -->/g, "")
  .replace(/\sstyle="opacity:0;transform:translateY\(28px\)"/g, "")
  .replace(/\ssrcSet="[^"]*"/g, "")
  .replace(/\sdata-nimg="[^"]*"/g, "")
  .replace(/href="\/#/g, 'href="#')
  .replace(/href="\/work\/[^"]+"/g, 'href="#work"')
  .replaceAll('href="/resume-placeholder.txt"', `href="data:text/plain;charset=utf-8,${resume}"`)
  .replace(/<link rel="icon" href="[^"]*"\/>/, `<link rel="icon" href="${favicon}"/>`)
  .replace("</head>", `<style>\n${css}\n:root{--font-montserrat:Montserrat,sans-serif}\n[data-standalone-reveal]{opacity:0;transform:translateY(24px);transition:opacity 550ms var(--ease-editorial),transform 550ms var(--ease-editorial)}\n[data-standalone-reveal].is-visible{opacity:1;transform:none}\n</style></head>`)
  .replace("</body>", `<script>
(() => {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.menu-button');
  const menu = document.querySelector('#mobile-menu');
  const desktopLinks = [...document.querySelectorAll('.primary-navigation a[href^="#"]')];
  const mobileLinks = [...document.querySelectorAll('#mobile-menu a[href^="#"]')];
  const allInternalLinks = [...desktopLinks, ...mobileLinks];
  const sections = ['home','work','about','process','contact'].map(id => document.getElementById(id)).filter(Boolean);

  const closeMenu = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden','true');
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Open menu');
    button.querySelector('span').textContent = 'Menu';
    document.body.classList.remove('menu-is-open');
    mobileLinks.forEach(link => link.tabIndex = -1);
  };
  const openMenu = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden','false');
    button.setAttribute('aria-expanded','true');
    button.setAttribute('aria-label','Close menu');
    button.querySelector('span').textContent = 'Close';
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

  const onScroll = () => header?.classList.toggle('is-scrolled', scrollY > 24);
  onScroll();
  addEventListener('scroll', onScroll, {passive:true});

  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      allInternalLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
    });
  }, {rootMargin:'-22% 0px -62% 0px'});
  sections.forEach(section => activeObserver.observe(section));

  const revealTargets = [...document.querySelectorAll('.section-heading-row,.about-grid,.metric,.experience-row,.credentials-grid,.process-row,.methods-section,.capability-group,.contact-section .page-container')];
  revealTargets.forEach(target => target.setAttribute('data-standalone-reveal',''));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) revealTargets.forEach(target => target.classList.add('is-visible'));
  else {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), {threshold:.08});
    revealTargets.forEach(target => revealObserver.observe(target));
  }

  document.querySelectorAll('.project-row').forEach(row => row.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const preview = row.querySelector('.project-preview');
    const bounds = row.getBoundingClientRect();
    if (preview) { preview.style.left = (event.clientX - bounds.left) + 'px'; preview.style.top = (event.clientY - bounds.top) + 'px'; }
  }));
})();
</script></body>`);

for (let index = 1; index <= 5; index += 1) {
  const imagePattern = new RegExp(`src="[^"]*project-${index}\\.webp[^"]*"`, "g");
  html = html.replace(imagePattern, `src="${projectImages[index]}"`);
}

html = html
  .replace(/<html([^>]*)class="[^"]*"([^>]*)>/, "<html$1$2>")
  .replace(/\sstyle="color:transparent"/g, "")
  .replace(/<a class="project-link"([^>]*)href="#work"/g, '<a class="project-link"$1href="#work"')
  .replace(/>Open case</g, ">Explore project<");

await fs.writeFile(path.join(root, "portfolio.html"), html);
console.log(`Created portfolio.html (${Math.round(Buffer.byteLength(html) / 1024)} KB)`);

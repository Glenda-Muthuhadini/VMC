import { business } from "./business.js";

export function initSite() {
  document.documentElement.classList.add("js-ready");
  const pagePath = window.location.pathname;
  const isSectionPage = /\/(about|contact|projects|services)(?:\/|$)/.test(pagePath);
  const logoPath = new URL("../Luxury VMC Painting Solutions Logo.png", import.meta.url).href;
  document.querySelectorAll(".brand-mark").forEach(mark => {
    const brand = mark.parentElement;
    const logo = document.createElement("img");
    logo.className = "brand-logo";
    logo.src = logoPath;
    logo.alt = "VMC Painting Solutions";
    brand.querySelector(".brand-name")?.remove();
    mark.replaceWith(logo);
  });
  const header = document.querySelector(".site-header");
  const menu = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const hero = document.querySelector(".hero, .page-hero");

  const syncHeader = () => {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle("is-scrolled", scrolled);
    header?.classList.toggle("is-over-hero", Boolean(hero) && !scrolled);
  };
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navigation?.classList.toggle("is-open", open);
  });
  navigation?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }));

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-current-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll("[data-business]").forEach(el => {
    const key = el.getAttribute("data-business");
    const value = business[key];
    if (Array.isArray(value)) el.textContent = value.length ? value.join(", ") : "Details to be confirmed";
    else el.textContent = value || "Details to be confirmed";
  });

  const contactLinks = {
    whatsapp: { href: business.whatsappHref, label: business.whatsapp, external: true },
    phone: { href: `tel:${business.phoneHref}`, label: business.phone },
    email: { href: business.emailHref, label: business.email },
    facebook: { href: business.facebookHref, label: business.facebook, external: true },
    address: { href: `https://maps.google.com/?q=${encodeURIComponent(business.address)}`, label: business.address, external: true }
  };
  document.querySelectorAll("[data-contact-link]").forEach(link => {
    const contact = contactLinks[link.getAttribute("data-contact-link")];
    if (!contact) return;
    link.href = contact.href;
    if (link.hasAttribute("data-contact-label")) link.textContent = contact.label;
    if (contact.external) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  document.querySelectorAll("[data-social-handle]").forEach(el => {
    const platform = el.getAttribute("data-social-handle");
    if (platform && business.social[platform]) el.textContent = business.social[platform];
  });

  document.querySelectorAll(".footer-tagline").forEach(el => { el.textContent = business.tagline; });
  document.querySelectorAll(".footer-bottom span:nth-child(2)").forEach(el => { el.textContent = business.tagline; });
  const isContactPage = /\/contact(?:\/|$)/.test(pagePath);
  document.querySelectorAll(".nav-quote").forEach(link => {
    link.href = isContactPage ? "#quote-form" : isSectionPage ? "../contact/#quote-form" : "contact/#quote-form";
  });
}

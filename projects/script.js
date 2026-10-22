import { initSite } from "../assets/js/site.js";
initSite();

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");
filterButtons.forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(option => {
    const active = option === button;
    option.classList.toggle("is-active", active);
    option.setAttribute("aria-pressed", String(active));
  });
  projectCards.forEach(card => {
    card.hidden = filter !== "all" && !card.dataset.category.split(" ").includes(filter);
  });
}));

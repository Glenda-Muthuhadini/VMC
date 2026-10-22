import { initSite } from "../assets/js/site.js";
initSite();

const visual = document.querySelector("[data-service-visual]");
document.querySelectorAll("[data-service]").forEach(item => {
  const activate = () => {
    document.querySelectorAll("[data-service]").forEach(service => service.classList.remove("active"));
    item.classList.add("active");
    if (!visual || visual.src === item.dataset.image) return;
    visual.classList.add("is-changing");
    window.setTimeout(() => {
      visual.src = item.dataset.image;
      visual.alt = item.dataset.alt;
      visual.onload = () => visual.classList.remove("is-changing");
    }, 150);
  };
  item.addEventListener("mouseenter", activate);
  item.addEventListener("focusin", activate);
});

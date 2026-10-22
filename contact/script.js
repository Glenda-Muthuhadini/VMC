import { initSite } from "../assets/js/site.js";
initSite();

const form = document.querySelector(".quote-form");
form?.addEventListener("submit", event => {
  event.preventDefault();
  const status = form.querySelector(".form-status");
  if (status) status.textContent = "Your details have not been sent. This form needs to be connected before it can receive enquiries.";
});

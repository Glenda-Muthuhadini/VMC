import { initSite } from "../assets/js/site.js";
initSite();

const form = document.querySelector(".quote-form");
form?.addEventListener("submit", event => {
  event.preventDefault();
  const status = form.querySelector(".form-status");
  const formData = new FormData(form);
  const message = [
    "Hi VMC Painting Solutions, I would like to request a free quote.",
    "",
    `Name: ${formData.get("name")}`,
    `Phone: ${formData.get("phone")}`,
    `Email: ${formData.get("email") || "Not provided"}`,
    `Area: ${formData.get("location")}`,
    `Service: ${formData.get("service")}`,
    `Project details: ${formData.get("message")}`
  ].join("\n");

  window.open(`https://wa.me/27818848513?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  if (status) status.textContent = "Your enquiry is ready in WhatsApp. Send the pre-filled message to request your free quote.";
});

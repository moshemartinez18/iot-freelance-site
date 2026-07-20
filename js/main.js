const translations = {
  en: {
    brand: "YourName IoT",
    nav_cta: "Book a call",
    hero_eyebrow: "Industrial IoT · Full-stack hardware & software",
    hero_title: "Working IoT prototypes in weeks — not months",
    hero_lead:
      "I build complete systems: sensors, firmware, wireless connectivity, and dashboards. One engineer from prototype to field-ready demo.",
    hero_cta_primary: "Start a project",
    hero_cta_secondary: "View packages",
    hero_diagram: "Sensor → firmware → dashboard",
    services_title: "What I build",
    services_sub: "Practical systems for startups, makers, and small industrial teams.",
    service_1_title: "IoT Prototype Sprint",
    service_1_desc:
      "End-to-end prototype with sensors, embedded firmware, and a web dashboard with alerts.",
    service_2_title: "Custom firmware",
    service_2_desc:
      "ESP32, STM32, wireless stacks, battery optimization, and reliable field communication.",
    service_3_title: "Technical audit",
    service_3_desc:
      "Fast review of your hardware/software prototype with risks, fixes, and a clear next-step plan.",
    packages_title: "Clear packages",
    packages_sub: "Fixed scope. Fixed timeline. No endless scope creep.",
    package_1_label: "Most popular",
    package_1_title: "IoT Prototype Sprint",
    package_1_time: "2–3 weeks",
    package_1_item_1: "1–2 sensors + microcontroller",
    package_1_item_2: "Firmware + wireless connectivity",
    package_1_item_3: "Web dashboard + basic alerts",
    package_1_item_4: "Handoff documentation",
    package_2_label: "Fast start",
    package_2_title: "Technical Audit",
    package_2_time: "3–5 days",
    package_2_item_1: "Architecture & firmware review",
    package_2_item_2: "Risk and reliability assessment",
    package_2_item_3: "Written report + 1h call",
    package_2_item_4: "Roadmap to production",
    package_cta: "Request quote",
    why_title: "Why work with me",
    why_1_value: "Full stack",
    why_1_label: "Hardware, firmware & dashboard in one workflow",
    why_2_value: "Industrial",
    why_2_label: "Experience with real field systems, not just demos",
    why_3_value: "3 languages",
    why_3_label: "English, Spanish, and Hebrew for global teams",
    contact_title: "Let's build your prototype",
    contact_sub:
      "Tell me what you need to measure, control, or monitor. I'll reply within 24 hours.",
    form_name: "Name",
    form_email: "Email",
    form_message: "Project details",
    form_placeholder: "What do you want to build? Timeline? Budget range?",
    form_submit: "Send message",
    form_note: "This opens your email client with a pre-filled message. No backend required.",
    footer_note: "Based in Israel · Available for remote projects worldwide",
    currency_note: "Prices shown in {currency}",
  },
  es: {
    brand: "YourName IoT",
    nav_cta: "Agendar llamada",
    hero_eyebrow: "IoT industrial · Hardware y software integrados",
    hero_title: "Prototipos IoT funcionando en semanas — no meses",
    hero_lead:
      "Construyo sistemas completos: sensores, firmware, conectividad inalámbrica y dashboards. Un solo ingeniero del prototipo a demo en campo.",
    hero_cta_primary: "Iniciar proyecto",
    hero_cta_secondary: "Ver paquetes",
    hero_diagram: "Sensor → firmware → dashboard",
    services_title: "Qué construyo",
    services_sub: "Sistemas prácticos para startups, makers y equipos industriales pequeños.",
    service_1_title: "IoT Prototype Sprint",
    service_1_desc:
      "Prototipo integral con sensores, firmware embebido y dashboard web con alertas.",
    service_2_title: "Firmware a medida",
    service_2_desc:
      "ESP32, STM32, comunicación inalámbrica, optimización de batería y confiabilidad en campo.",
    service_3_title: "Auditoría técnica",
    service_3_desc:
      "Revisión rápida de tu prototipo hardware/software con riesgos, correcciones y plan de acción.",
    packages_title: "Paquetes claros",
    packages_sub: "Alcance fijo. Plazo fijo. Sin proyectos interminables.",
    package_1_label: "Más popular",
    package_1_title: "IoT Prototype Sprint",
    package_1_time: "2–3 semanas",
    package_1_item_1: "1–2 sensores + microcontrolador",
    package_1_item_2: "Firmware + conectividad inalámbrica",
    package_1_item_3: "Dashboard web + alertas básicas",
    package_1_item_4: "Documentación de entrega",
    package_2_label: "Inicio rápido",
    package_2_title: "Auditoría Técnica",
    package_2_time: "3–5 días",
    package_2_item_1: "Revisión de arquitectura y firmware",
    package_2_item_2: "Evaluación de riesgos y confiabilidad",
    package_2_item_3: "Informe escrito + llamada de 1h",
    package_2_item_4: "Hoja de ruta hacia producción",
    package_cta: "Solicitar cotización",
    why_title: "Por qué trabajar conmigo",
    why_1_value: "Full stack",
    why_1_label: "Hardware, firmware y dashboard en un solo flujo",
    why_2_value: "Industrial",
    why_2_label: "Experiencia con sistemas reales en campo, no solo demos",
    why_3_value: "3 idiomas",
    why_3_label: "Inglés, español y hebreo para equipos globales",
    contact_title: "Construyamos tu prototipo",
    contact_sub:
      "Cuéntame qué necesitas medir, controlar o monitorear. Respondo en menos de 24 horas.",
    form_name: "Nombre",
    form_email: "Email",
    form_message: "Detalles del proyecto",
    form_placeholder: "¿Qué quieres construir? ¿Plazo? ¿Rango de presupuesto?",
    form_submit: "Enviar mensaje",
    form_note: "Esto abre tu cliente de email con el mensaje prellenado. Sin backend.",
    footer_note: "Basado en Israel · Disponible para proyectos remotos en todo el mundo",
    currency_note: "Precios mostrados en {currency}",
  },
};

function formatUsd(amount) {
  return `$${amount.toLocaleString("en-US")}`;
}

function formatIls(amount) {
  const rounded = Math.round(amount / 50) * 50;
  return `₪${rounded.toLocaleString("en-US")}`;
}

function getPriceRange(key) {
  const cfg = window.SITE_CONFIG?.prices?.[key];
  if (!cfg) return null;
  return { usdMin: cfg.usdMin, usdMax: cfg.usdMax };
}

function formatPriceRange(usdMin, usdMax, currency) {
  const rate = window.SITE_CONFIG?.usdToIls || 3.65;
  if (currency === "ils") {
    return `${formatIls(usdMin * rate)} – ${formatIls(usdMax * rate)}`;
  }
  return `${formatUsd(usdMin)} – ${formatUsd(usdMax)}`;
}

function setCurrency(currency, options = { persist: true }) {
  const valid = currency === "ils" ? "ils" : "usd";

  document.querySelectorAll(".currency-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.currency === valid);
  });

  document.querySelectorAll("[data-price-key]").forEach((el) => {
    const range = getPriceRange(el.dataset.priceKey);
    if (!range) return;
    el.textContent = formatPriceRange(range.usdMin, range.usdMax, valid);
  });

  if (options.persist) {
    localStorage.setItem("site-currency", valid);
  }
}

async function detectDefaultCurrency() {
  const saved = localStorage.getItem("site-currency");
  if (saved) return saved;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const response = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error("geo lookup failed");

    const data = await response.json();
    return data.country_code === "IL" ? "ils" : "usd";
  } catch {
    return "usd";
  }
}

async function initCurrency() {
  const currency = await detectDefaultCurrency();
  setCurrency(currency, { persist: false });
}

function applyConfig() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  if (cfg.brand) {
    document.querySelectorAll('[data-i18n="brand"]').forEach((el) => {
      el.textContent = cfg.brand;
    });
    translations.en.brand = cfg.brand;
    translations.es.brand = cfg.brand;
  }

  const emailLink = document.getElementById("email-link");
  if (emailLink && cfg.email) {
    emailLink.href = `mailto:${cfg.email}`;
    emailLink.textContent = cfg.email;
  }

  const waLink = document.getElementById("whatsapp-link");
  if (waLink && cfg.whatsapp) {
    waLink.href = `https://wa.me/${cfg.whatsapp}`;
    waLink.textContent = cfg.whatsappDisplay || cfg.whatsapp;
  }

  const liLink = document.getElementById("linkedin-link");
  if (liLink && cfg.linkedin) {
    liLink.href = cfg.linkedin;
    liLink.textContent = cfg.linkedin.replace(/^https?:\/\//, "");
  }
}

function setLanguage(lang) {
  const strings = translations[lang] || translations.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (strings[key]) el.textContent = strings[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (strings[key]) el.placeholder = strings[key];
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem("site-lang", lang);
}

function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const to = window.SITE_CONFIG?.email || "you@example.com";
    const subject = encodeURIComponent(`IoT project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  setLanguage(localStorage.getItem("site-lang") || "en");
  initCurrency();

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  document.querySelectorAll(".currency-btn").forEach((btn) => {
    btn.addEventListener("click", () => setCurrency(btn.dataset.currency, { persist: true }));
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  initForm();
});

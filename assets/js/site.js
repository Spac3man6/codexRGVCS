const siteConfig = {
  phoneDisplay: "(956) 502-9365",
  phoneHref: "+19565029365",
  email: "rgvconcretestain@gmail.com",
  // Formspree endpoint. Every lead form POSTs here via AJAX (see initForms).
  formEndpoint: "https://formspree.io/f/xkoanrop",
  serviceArea: [
    "McAllen",
    "Edinburg",
    "Mission",
    "Pharr",
    "Harlingen",
    "Brownsville",
    "Weslaco"
  ],
  // Cities that have a dedicated landing page. Pharr and Weslaco have none yet,
  // so they render as plain text in the footer instead of links.
  cityPages: {
    McAllen: "mcallen.html",
    Edinburg: "edinburg.html",
    Mission: "mission.html",
    Harlingen: "harlingen.html",
    Brownsville: "brownsville.html"
  },
  pages: {
    home: "index.html",
    services: "services.html",
    gallery: "gallery.html",
    about: "about.html",
    contact: "contact.html",
    caseStudies: "case-studies.html",
    faq: "faq.html"
  },
  // Spanish counterparts, used when document.documentElement.lang starts with "es".
  pagesEs: {
    home: "es.html",
    services: "servicios.html",
    gallery: "gallery.html",
    about: "about.html",
    contact: "contacto.html",
    caseStudies: "case-studies.html",
    faq: "faq.html"
  },
  services: [
    { label: "Concrete Staining", labelEs: "Tinción de Concreto", href: "concrete-staining.html", key: "staining" },
    { label: "Concrete Polishing", labelEs: "Pulido de Concreto", href: "concrete-polishing.html", key: "polishing" },
    { label: "Epoxy Flooring", labelEs: "Pisos de Epóxico", href: "epoxy-flooring.html", key: "epoxy" },
    { label: "Decorative Coatings", labelEs: "Recubrimientos Decorativos", href: "decorative-coatings.html", key: "decorative" },
    { label: "Garage Floor Coatings", labelEs: "Recubrimientos para Piso de Garaje", href: "garage-floor-coatings.html", key: "garage" }
  ]
};

// Every user-facing string rendered by the shared chrome. Keyed by locale so the
// header, footer, sticky bar, estimate modal, and lead-form status messages all
// follow the page's own lang attribute instead of being hardcoded English.
const siteCopy = {
  en: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    brandHomeAria: "RGV Concrete Stain home",
    navAria: "Primary",
    navServices: "Services",
    navGallery: "Gallery",
    navCaseStudies: "Case Studies",
    navAbout: "About",
    navCall: "Call Us",
    langCode: "ES",
    footerBrandSub: "Premium Staining, Polishing, Epoxy, and Concrete Coatings",
    footerFinishes: "Signature Finishes",
    footerServiceArea: "Service Area",
    footerProjectFit: "Project Fit",
    fitResidential: "Homes, garages, patios, and poolside concrete",
    fitCommercial: "Retail interiors, offices, restaurants, and hospitality floors",
    fitBuilder: "Builder and GC turnover packages",
    fitMaintenance: "Reseals, refinishing, polish maintenance, and coating refreshes",
    footerCaseStudies: "View case studies",
    footerFaq: "Common questions",
    footerContact: "Contact",
    footerSchedule: "Schedule a call",
    footerHours: "Mon-Fri, 8:00 AM to 5:00 PM &middot; Sat, 9:00 AM to 3:00 PM",
    footerEstimate: "Request an Estimate",
    legalBefore: "All Rights Reserved &copy;",
    legalAfter: "RGV Concrete Stain",
    footerSitemap: "Sitemap",
    stickySchedule: "Schedule a Call",
    stickyPhone: "Speak with an Expert Now",
    modalEyebrow: "Discuss Your Project",
    modalTitle: "Get a Valley-Sized Estimate",
    modalIntro: "Tell us about your project and we'll follow up with a custom estimate.",
    modalClose: "Close",
    fieldName: "Name",
    fieldEmail: "Email",
    fieldPhone: "Phone",
    fieldCity: "Project City",
    fieldService: "Service",
    fieldSize: "Project Size",
    fieldDetails: "Project Details",
    selectCity: "Select a city",
    selectService: "Choose a finish",
    selectSize: "Select project size",
    sizeSmall: "Under 500 sq. ft.",
    sizeMedium: "500 - 1,500 sq. ft.",
    sizeLarge: "1,500 - 5,000 sq. ft.",
    sizeXl: "5,000+ sq. ft.",
    detailsPlaceholder:
      "Describe the condition of the concrete, finish you want, target schedule, and anything that should be quoted.",
    submit: "Request Proposal",
    formIncomplete: "Please complete every required field before requesting pricing.",
    formEmail: "Enter a valid email address so the estimator can reply.",
    formSending: "Sending your request…",
    formSuccess: "Thank you. Your request was sent. We'll be in touch shortly.",
    formFailed: "We couldn't send your request. Please call",
    formNetwork: "Network error sending your request. Please call"
  },
  es: {
    skipToContent: "Ir al contenido",
    openMenu: "Abrir menú",
    brandHomeAria: "Inicio de RGV Concrete Stain",
    navAria: "Principal",
    navServices: "Servicios",
    navGallery: "Galería",
    navCaseStudies: "Casos de Estudio",
    navAbout: "Nosotros",
    navCall: "Llámanos",
    langCode: "EN",
    footerBrandSub: "Tinción, Pulido, Epóxico y Recubrimientos de Concreto",
    footerFinishes: "Acabados Principales",
    footerServiceArea: "Área de Servicio",
    footerProjectFit: "Tipos de Proyecto",
    fitResidential: "Casas, garajes, patios y áreas de alberca",
    fitCommercial: "Interiores comerciales, oficinas, restaurantes y pisos de hospitalidad",
    fitBuilder: "Entregas para constructores y contratistas generales",
    fitMaintenance: "Resellados, restauración, mantenimiento de pisos pulidos y renovación de recubrimientos",
    footerCaseStudies: "Ver casos de estudio",
    footerFaq: "Preguntas frecuentes",
    footerContact: "Contacto",
    footerSchedule: "Agendar una llamada",
    footerHours: "Lun a Vie, 8:00 AM a 5:00 PM &middot; Sáb, 9:00 AM a 3:00 PM",
    footerEstimate: "Solicitar una Cotización",
    legalBefore: "&copy;",
    legalAfter: "RGV Concrete Stain. Todos los derechos reservados.",
    footerSitemap: "Mapa del sitio",
    stickySchedule: "Agendar una Llamada",
    stickyPhone: "Hablar con un Experto Ahora",
    modalEyebrow: "Hablemos de tu Piso",
    modalTitle: "Una Cotización a la Medida del Valle",
    modalIntro: "Cuéntanos sobre tu proyecto y te enviamos una cotización personalizada.",
    modalClose: "Cerrar",
    fieldName: "Nombre",
    fieldEmail: "Correo",
    fieldPhone: "Teléfono",
    fieldCity: "Ciudad del Proyecto",
    fieldService: "Servicio",
    fieldSize: "Tamaño del Proyecto",
    fieldDetails: "Detalles del Proyecto",
    selectCity: "Selecciona una ciudad",
    selectService: "Elige un servicio",
    selectSize: "Selecciona el tamaño",
    sizeSmall: "Menos de 500 pies cuadrados",
    sizeMedium: "500 a 1,500 pies cuadrados",
    sizeLarge: "1,500 a 5,000 pies cuadrados",
    sizeXl: "Más de 5,000 pies cuadrados",
    detailsPlaceholder:
      "Describe el estado del concreto, el acabado que buscas, la fecha deseada y cualquier detalle que debamos cotizar.",
    submit: "Solicitar Cotización",
    formIncomplete: "Completa todos los campos obligatorios antes de solicitar la cotización.",
    formEmail: "Escribe un correo electrónico válido para que podamos responderte.",
    formSending: "Enviando tu solicitud…",
    formSuccess: "Gracias. Tu solicitud fue enviada. Te contactamos muy pronto.",
    formFailed: "No pudimos enviar tu solicitud. Por favor llama al",
    formNetwork: "No se pudo enviar. Revisa tu conexión y por favor llama al"
  }
};

const page = document.body.dataset.page || "home";
// Spanish pages use "home-es", "services-es", "contact-es". Normalize so aria-current works in both locales.
const pageKey = String(page).replace(/-es$/, "");
const serviceKey = document.body.dataset.service || "";
const mobileNavMaxWidth = 1200;

// Anything starting with "es" is Spanish. Anything else falls back to English so
// an unexpected lang value degrades safely instead of rendering undefined strings.
const locale = String(document.documentElement.lang || "en").toLowerCase().indexOf("es") === 0 ? "es" : "en";
const copy = siteCopy[locale];
const pages = locale === "es" ? siteConfig.pagesEs : siteConfig.pages;
const serviceLabel = (service) => (locale === "es" ? service.labelEs : service.label);

// Explicit counterpart map for the language toggle. Pages with no counterpart
// fall back to the other language's homepage.
const localeCounterparts = {
  "index.html": "es.html",
  "services.html": "servicios.html",
  "contact.html": "contacto.html",
  "es.html": "index.html",
  "servicios.html": "services.html",
  "contacto.html": "contact.html"
};

function currentFileName() {
  const path = String(window.location.pathname || "").replace(/\/+$/, "");
  const last = path.substring(path.lastIndexOf("/") + 1);
  if (!last) return "index.html";
  return last.endsWith(".html") ? last : last + ".html";
}

function languageToggleLabel() {
  const hasCounterpart = Boolean(localeCounterparts[currentFileName()]);
  if (locale === "es") {
    return hasCounterpart ? "EN, view this page in English" : "EN, go to the English version of the site";
  }
  return hasCounterpart ? "ES, ver esta página en español" : "ES, ir a la versión en español del sitio";
}

function languageToggleHref() {
  const counterpart = localeCounterparts[currentFileName()];
  if (counterpart) return counterpart;
  return locale === "es" ? "index.html" : "es.html";
}

function renderSiteHeader() {
  const headerMount = document.querySelector("[data-site-header]");
  if (!headerMount) return;

  const serviceLinks = siteConfig.services
    .map((service) => {
      const current = service.key === serviceKey ? ' aria-current="page"' : "";
      return `<li><a class="dropdown-link" href="${service.href}"${current}>${serviceLabel(service)}</a></li>`;
    })
    .join("");

  const pageCurrent = (key) => (pageKey === key ? ' aria-current="page"' : "");
  const servicesCurrent = pageKey === "services" || serviceKey ? ' aria-current="page"' : "";

  headerMount.innerHTML = `
    <a class="skip-link" href="#main-content">${copy.skipToContent}</a>
    <header class="site-header" data-header>
      <div class="container-wide site-header__inner">
        <a class="site-brand" href="${pages.home}" aria-label="${copy.brandHomeAria}">
          <span class="site-brand__mark">RGV Concrete Stain</span>
        </a>
        <button
          class="menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="site-navigation"
          data-menu-toggle
        >
          <span class="sr-only">${copy.openMenu}</span>
          <span class="menu-toggle__bar" aria-hidden="true"></span>
        </button>
        <nav class="site-nav" id="site-navigation" aria-label="${copy.navAria}" data-site-nav>
          <ul class="site-nav__menu">
            <li class="site-nav__item nav-dropdown" data-nav-dropdown>
              <a class="nav-link" href="${pages.services}"${servicesCurrent}>
                ${copy.navServices}
                <span class="nav-link__caret" aria-hidden="true"></span>
              </a>
              <ul class="dropdown-menu">
                ${serviceLinks}
              </ul>
            </li>
            <li class="site-nav__item">
              <a class="nav-link" href="${pages.gallery}"${pageCurrent("gallery")}>${copy.navGallery}</a>
            </li>
            <li class="site-nav__item">
              <a class="nav-link" href="${pages.caseStudies}"${pageCurrent("caseStudies")}>${copy.navCaseStudies}</a>
            </li>
            <li class="site-nav__item">
              <a class="nav-link" href="${pages.about}"${pageCurrent("about")}>${copy.navAbout}</a>
            </li>
            <li class="site-nav__item">
              <a class="nav-link" href="${languageToggleHref()}" lang="${locale === "es" ? "en" : "es"}" hreflang="${locale === "es" ? "en" : "es"}" aria-label="${languageToggleLabel()}">${copy.langCode}</a>
            </li>
            <li class="site-nav__item">
              <a class="nav-contact" href="tel:${siteConfig.phoneHref}">${copy.navCall}</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `;
}

function renderSiteFooter() {
  const footerMount = document.querySelector("[data-site-footer]");
  if (!footerMount) return;

  const footerServiceLinks = siteConfig.services
    .map((service) => `<li><a class="footer-link" href="${service.href}">${serviceLabel(service)}</a></li>`)
    .join("");

  // Cities with a landing page become links. Pharr and Weslaco stay plain text.
  const footerCityItems = siteConfig.serviceArea
    .map((city) => {
      const href = siteConfig.cityPages[city];
      return href
        ? `<li><a class="footer-link" href="${href}">${city}, Texas</a></li>`
        : `<li>${city}, Texas</li>`;
    })
    .join("");

  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="container-wide site-footer__inner">
        <div class="site-footer__brand">
          <span class="site-footer__brand-mark">RGV Concrete Stain</span>
          <span class="site-footer__brand-sub">${copy.footerBrandSub}</span>
        </div>
        <div class="site-footer__grid">
          <section>
            <h2 class="site-footer__title">${copy.footerFinishes}</h2>
            <ul class="site-footer__list">
              ${footerServiceLinks}
            </ul>
          </section>
          <section>
            <h2 class="site-footer__title">${copy.footerServiceArea}</h2>
            <ul class="site-footer__list">
              ${footerCityItems}
            </ul>
          </section>
          <section>
            <h2 class="site-footer__title">${copy.footerProjectFit}</h2>
            <ul class="site-footer__list">
              <li>${copy.fitResidential}</li>
              <li>${copy.fitCommercial}</li>
              <li>${copy.fitBuilder}</li>
              <li>${copy.fitMaintenance}</li>
              <li><a class="footer-link" href="${pages.caseStudies}">${copy.footerCaseStudies}</a></li>
              <li><a class="footer-link" href="${pages.faq}">${copy.footerFaq}</a></li>
            </ul>
          </section>
          <section>
            <h2 class="site-footer__title">${copy.footerContact}</h2>
            <p><a class="footer-contact" href="tel:${siteConfig.phoneHref}">${siteConfig.phoneDisplay}</a></p>
            <p><a class="footer-contact" href="mailto:${siteConfig.email}">${siteConfig.email}</a></p>
            <p><a class="footer-contact footer-link--estimate" href="${pages.contact}#request-estimate">${copy.footerSchedule}</a></p>
            <p class="site-footer__hours">${copy.footerHours}</p>
          </section>
        </div>
      </div>
      <div class="site-footer__bottom">
        <div class="container-wide">
          <p class="site-footer__legal">
            <a class="footer-link footer-link--estimate" href="${pages.contact}#request-estimate">${copy.footerEstimate}</a>
            <span class="site-footer__legal-copy">
              ${copy.legalBefore} <span data-current-year></span> ${copy.legalAfter} |
              <a class="footer-link" href="sitemap.xml">${copy.footerSitemap}</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  `;
}

function renderStickyBar() {
  const stickyMount = document.querySelector("[data-sticky-cta]");
  if (!stickyMount) return;

  stickyMount.innerHTML = `
    <div class="sticky-bar" data-sticky-bar>
      <div class="container-wide sticky-bar__inner">
        <button class="sticky-bar__link sticky-bar__link--schedule" type="button" data-open-estimate>${copy.stickySchedule}</button>
        <span class="sticky-bar__sep" aria-hidden="true">|</span>
        <a class="sticky-bar__link sticky-bar__link--phone" href="tel:${siteConfig.phoneHref}">${copy.stickyPhone}</a>
      </div>
    </div>
  `;
}

function renderEstimateModal() {
  const modalMount = document.querySelector("[data-estimate-modal]");
  if (!modalMount) return;

  modalMount.innerHTML = `
    <div class="modal" aria-hidden="true" data-estimate-modal-ui>
      <div class="modal__overlay" data-close-estimate></div>
      <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="estimate-modal-title">
        <button class="modal__close" type="button" aria-label="${copy.modalClose}" data-close-estimate>&times;</button>
        <div class="modal__content">
          <div class="modal__intro flow">
            <span class="eyebrow">${copy.modalEyebrow}</span>
            <h2 id="estimate-modal-title">${copy.modalTitle}</h2>
            <p>
              ${copy.modalIntro}
            </p>
          </div>
          <form class="lead-form" data-lead-form="modal-estimate">
            <div class="lead-form__grid">
              <div class="lead-form__field">
                <label for="estimate-name">${copy.fieldName}</label>
                <input id="estimate-name" name="name" type="text" autocomplete="name" required />
              </div>
              <div class="lead-form__field">
                <label for="estimate-email">${copy.fieldEmail}</label>
                <input id="estimate-email" name="email" type="email" autocomplete="email" required />
              </div>
              <div class="lead-form__field">
                <label for="estimate-phone">${copy.fieldPhone}</label>
                <input id="estimate-phone" name="phone" type="tel" autocomplete="tel" required />
              </div>
              <div class="lead-form__field">
                <label for="estimate-city">${copy.fieldCity}</label>
                <select id="estimate-city" name="city" required>
                  <option value="">${copy.selectCity}</option>
                  ${siteConfig.serviceArea.map((city) => `<option value="${city}">${city}</option>`).join("")}
                </select>
              </div>
              <div class="lead-form__field">
                <label for="estimate-service">${copy.fieldService}</label>
                <select id="estimate-service" name="service" required>
                  <option value="">${copy.selectService}</option>
                  ${siteConfig.services.map((service) => `<option value="${service.label}">${serviceLabel(service)}</option>`).join("")}
                </select>
              </div>
              <div class="lead-form__field">
                <label for="estimate-size">${copy.fieldSize}</label>
                <select id="estimate-size" name="project-size" required>
                  <option value="">${copy.selectSize}</option>
                  <option value="Under 500 sq. ft.">${copy.sizeSmall}</option>
                  <option value="500 - 1,500 sq. ft.">${copy.sizeMedium}</option>
                  <option value="1,500 - 5,000 sq. ft.">${copy.sizeLarge}</option>
                  <option value="5,000+ sq. ft.">${copy.sizeXl}</option>
                </select>
              </div>
              <div class="lead-form__field lead-form__field--full">
                <label for="estimate-message">${copy.fieldDetails}</label>
                <textarea
                  id="estimate-message"
                  name="message"
                  placeholder="${copy.detailsPlaceholder}"
                  required
                ></textarea>
              </div>
            </div>
            <div class="lead-form__status" data-form-status></div>
            <button class="btn btn--primary" type="submit">${copy.submit}</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function setCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function initHeaderBehavior() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 28);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

function closeNav() {
  const nav = document.querySelector("[data-site-nav]");
  const toggle = document.querySelector("[data-menu-toggle]");
  if (!nav || !toggle) return;

  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
  document.querySelectorAll("[data-nav-dropdown]").forEach((dropdown) => {
    dropdown.classList.remove("is-open");
  });
}

function initNavigation() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const dropdowns = document.querySelectorAll("[data-nav-dropdown]");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-link");
    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
      if (window.innerWidth > mobileNavMaxWidth) return;

      event.preventDefault();
      const isOpen = dropdown.classList.contains("is-open");
      dropdowns.forEach((item) => item.classList.remove("is-open"));
      if (!isOpen) dropdown.classList.add("is-open");
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (!target.closest("[data-site-nav]") && !target.closest("[data-menu-toggle]")) {
      if (window.innerWidth <= mobileNavMaxWidth) closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > mobileNavMaxWidth) closeNav();
  });
}

function initAccordion() {
  document.querySelectorAll("[data-accordion-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion__item");
      if (!item) return;

      const isOpen = item.classList.contains("is-open");
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll(".accordion__item").forEach((sibling) => {
          sibling.classList.remove("is-open");
          const siblingButton = sibling.querySelector("[data-accordion-button]");
          if (siblingButton) siblingButton.setAttribute("aria-expanded", "false");
        });
      }

      item.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

function initReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initStickyBar() {
  const bar = document.querySelector("[data-sticky-bar]");
  if (!bar) return;

  const syncBar = () => {
    bar.classList.toggle("is-visible", window.scrollY > 260);
  };

  syncBar();
  window.addEventListener("scroll", syncBar, { passive: true });
}

function toggleEstimateModal(open) {
  const modal = document.querySelector("[data-estimate-modal-ui]");
  if (!modal) return;

  modal.classList.toggle("is-open", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("modal-open", open);
}

function initEstimateModal() {
  document.querySelectorAll("[data-open-estimate]").forEach((trigger) => {
    trigger.addEventListener("click", () => toggleEstimateModal(true));
  });

  document.querySelectorAll("[data-close-estimate]").forEach((trigger) => {
    trigger.addEventListener("click", () => toggleEstimateModal(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggleEstimateModal(false);
    }
  });
}

function initGallery() {
  const galleryLinks = Array.from(document.querySelectorAll("[data-gallery-item]"));
  if (!galleryLinks.length) return;

  let activeIndex = -1;
  let currentGroup = "";

  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.innerHTML = `
    <div class="gallery-modal__overlay" data-gallery-close></div>
    <div class="gallery-modal__dialog">
      <button class="gallery-modal__close" type="button" aria-label="Close gallery" data-gallery-close>&times;</button>
      <button class="gallery-modal__nav gallery-modal__nav--prev" type="button" aria-label="Previous image" data-gallery-prev>&larr;</button>
      <button class="gallery-modal__nav gallery-modal__nav--next" type="button" aria-label="Next image" data-gallery-next>&rarr;</button>
      <div class="gallery-modal__frame">
        <img class="gallery-modal__image" alt="" loading="lazy" decoding="async" />
        <p class="gallery-modal__caption"></p>
      </div>
    </div>
  `;

  document.body.append(modal);

  const imageNode = modal.querySelector(".gallery-modal__image");
  const captionNode = modal.querySelector(".gallery-modal__caption");

  const groupItems = () => galleryLinks.filter((item) => item.dataset.gallery === currentGroup);

  const updateModal = () => {
    const items = groupItems();
    const link = items[activeIndex];
    if (!link || !imageNode || !captionNode) return;

    const source = link.getAttribute("href");
    const img = link.querySelector("img");
    const alt = img?.getAttribute("alt") || "";
    imageNode.src = source || "";
    imageNode.alt = alt;
    captionNode.textContent = alt;
  };

  const openModal = (link) => {
    currentGroup = link.dataset.gallery || "default";
    activeIndex = groupItems().indexOf(link);
    updateModal();
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    activeIndex = -1;
  };

  const shiftImage = (direction) => {
    const items = groupItems();
    if (!items.length) return;
    activeIndex = (activeIndex + direction + items.length) % items.length;
    updateModal();
  };

  galleryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(link);
    });
  });

  modal.querySelectorAll("[data-gallery-close]").forEach((trigger) => {
    trigger.addEventListener("click", closeModal);
  });

  modal.querySelector("[data-gallery-prev]")?.addEventListener("click", () => shiftImage(-1));
  modal.querySelector("[data-gallery-next]")?.addEventListener("click", () => shiftImage(1));

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") shiftImage(-1);
    if (event.key === "ArrowRight") shiftImage(1);
  });
}

function initForms() {
  const forms = document.querySelectorAll("[data-lead-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    const citySelect = form.querySelector('select[name="city"]');
    const otherCityField = form.querySelector("[data-other-city-field]");
    const otherCityInput = otherCityField ? otherCityField.querySelector("input") : null;
    let syncOtherCity = () => {};

    if (citySelect instanceof HTMLSelectElement && otherCityField instanceof HTMLElement && otherCityInput instanceof HTMLInputElement) {
      syncOtherCity = () => {
        const needsOtherCity = citySelect.value === "Other";
        otherCityField.hidden = !needsOtherCity;
        otherCityInput.required = needsOtherCity;
        if (!needsOtherCity) otherCityInput.value = "";
      };

      syncOtherCity();
      citySelect.addEventListener("change", syncOtherCity);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const htmlForm = event.currentTarget;
      if (!(htmlForm instanceof HTMLFormElement)) return;

      const status = htmlForm.querySelector("[data-form-status]");
      if (!(status instanceof HTMLElement)) return;

      const data = new FormData(htmlForm);
      const fields = Object.fromEntries(data.entries());
      const missing = Array.from(htmlForm.querySelectorAll("[required]")).find((control) => {
        if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) {
          return false;
        }
        return !String(control.value || "").trim();
      });

      if (missing) {
        status.textContent = copy.formIncomplete;
        status.className = "lead-form__status is-error";
        return;
      }

      const email = String(fields.email || "");
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailValid) {
        status.textContent = copy.formEmail;
        status.className = "lead-form__status is-error";
        return;
      }

      const payload = {
        ...fields,
        page,
        form: htmlForm.dataset.leadForm || "site-form",
        submittedAt: new Date().toISOString()
      };

      status.textContent = copy.formSending;
      status.className = "lead-form__status";

      fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New website request: ${payload.form}`,
          ...payload
        })
      })
        .then((response) => {
          if (response.ok) {
            status.textContent = copy.formSuccess;
            status.className = "lead-form__status is-success";
            htmlForm.reset();
            syncOtherCity();
            return;
          }
          return response.json().catch(() => ({})).then((data) => {
            const errors = data && Array.isArray(data.errors) ? data.errors : [];
            status.textContent = errors.length
              ? errors.map((err) => err.message).join(" ")
              : `${copy.formFailed} ${siteConfig.phoneDisplay}.`;
            status.className = "lead-form__status is-error";
          });
        })
        .catch(() => {
          status.textContent = `${copy.formNetwork} ${siteConfig.phoneDisplay}.`;
          status.className = "lead-form__status is-error";
        });
    });
  });
}

function init() {
  renderSiteHeader();
  renderSiteFooter();
  renderStickyBar();
  renderEstimateModal();
  setCurrentYear();
  initHeaderBehavior();
  initNavigation();
  initAccordion();
  initReveal();
  initStickyBar();
  initEstimateModal();
  initGallery();
  initForms();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

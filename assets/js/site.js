const siteConfig = {
  phoneDisplay: "(956) 502-9635",
  phoneHref: "+19565029635",
  email: "hello@rgvconcretestain.com",
  serviceArea: [
    "McAllen",
    "Edinburg",
    "Mission",
    "Pharr",
    "Harlingen",
    "Brownsville",
    "Weslaco"
  ],
  pages: {
    home: "index.html",
    services: "services.html",
    gallery: "gallery.html",
    about: "about.html",
    contact: "contact.html",
    caseStudies: "case-studies.html"
  },
  services: [
    { label: "Concrete Staining", href: "concrete-staining.html", key: "staining" },
    { label: "Concrete Polishing", href: "concrete-polishing.html", key: "polishing" },
    { label: "Epoxy Flooring", href: "epoxy-flooring.html", key: "epoxy" },
    { label: "Decorative Coatings", href: "decorative-coatings.html", key: "decorative" },
    { label: "Garage Floor Coatings", href: "garage-floor-coatings.html", key: "garage" }
  ]
};

const page = document.body.dataset.page || "home";
const serviceKey = document.body.dataset.service || "";

function renderSiteHeader() {
  const headerMount = document.querySelector("[data-site-header]");
  if (!headerMount) return;

  const serviceLinks = siteConfig.services
    .map((service) => {
      const current = service.key === serviceKey ? ' aria-current="page"' : "";
      return `<li><a class="dropdown-link" href="${service.href}"${current}>${service.label}</a></li>`;
    })
    .join("");

  const pageCurrent = (key) => (page === key ? ' aria-current="page"' : "");
  const servicesCurrent = page === "services" || serviceKey ? ' aria-current="page"' : "";

  headerMount.innerHTML = `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header" data-header>
      <div class="container-wide site-header__inner">
        <a class="site-brand" href="${siteConfig.pages.home}" aria-label="RGV Concrete Stain home">
          <span class="site-brand__mark">RGV Concrete Stain</span>
        </a>
        <button
          class="menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="site-navigation"
          data-menu-toggle
        >
          <span class="sr-only">Open menu</span>
          <span class="menu-toggle__bar" aria-hidden="true"></span>
        </button>
        <nav class="site-nav" id="site-navigation" aria-label="Primary" data-site-nav>
          <ul class="site-nav__menu">
            <li class="site-nav__item nav-dropdown" data-nav-dropdown>
              <a class="nav-link" href="${siteConfig.pages.services}"${servicesCurrent}>
                Services
                <span class="nav-link__caret" aria-hidden="true"></span>
              </a>
              <ul class="dropdown-menu">
                ${serviceLinks}
              </ul>
            </li>
            <li class="site-nav__item">
              <a class="nav-link" href="${siteConfig.pages.gallery}"${pageCurrent("gallery")}>Gallery</a>
            </li>
            <li class="site-nav__item">
              <a class="nav-link" href="${siteConfig.pages.caseStudies}"${pageCurrent("caseStudies")}>Case Studies</a>
            </li>
            <li class="site-nav__item">
              <a class="nav-link" href="${siteConfig.pages.about}"${pageCurrent("about")}>About</a>
            </li>
            <li class="site-nav__item">
              <a class="nav-contact" href="tel:${siteConfig.phoneHref}">Call Us</a>
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

  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="container-wide site-footer__inner">
        <div class="site-footer__brand">
          <span class="site-footer__brand-mark">RGV Concrete Stain</span>
          <span class="site-footer__brand-sub">Premium Staining, Polishing, Epoxy, and Concrete Coatings</span>
        </div>
        <div class="site-footer__grid">
          <section>
            <h2 class="site-footer__title">Signature Finishes</h2>
            <ul class="site-footer__list">
              <li><a class="footer-link" href="concrete-staining.html">Concrete staining</a></li>
              <li><a class="footer-link" href="concrete-polishing.html">Concrete polishing</a></li>
              <li><a class="footer-link" href="epoxy-flooring.html">Epoxy flooring</a></li>
              <li><a class="footer-link" href="decorative-coatings.html">Decorative coatings</a></li>
              <li><a class="footer-link" href="garage-floor-coatings.html">Garage floor coatings</a></li>
            </ul>
          </section>
          <section>
            <h2 class="site-footer__title">Service Area</h2>
            <ul class="site-footer__list">
              ${siteConfig.serviceArea.map((city) => `<li>${city}, Texas</li>`).join("")}
            </ul>
          </section>
          <section>
            <h2 class="site-footer__title">Project Fit</h2>
            <ul class="site-footer__list">
              <li>Homes, garages, patios, and poolside concrete</li>
              <li>Retail interiors, offices, restaurants, and hospitality floors</li>
              <li>Builder and GC turnover packages</li>
              <li>Reseals, refinishing, polish maintenance, and coating refreshes</li>
              <li><a class="footer-link" href="${siteConfig.pages.caseStudies}">View case studies</a></li>
            </ul>
          </section>
          <section>
            <h2 class="site-footer__title">Contact</h2>
            <p><a class="footer-contact" href="tel:${siteConfig.phoneHref}">${siteConfig.phoneDisplay}</a></p>
            <p><a class="footer-contact" href="mailto:${siteConfig.email}">${siteConfig.email}</a></p>
            <p><a class="footer-contact" href="${siteConfig.pages.contact}#request-estimate">Schedule a call</a></p>
            <p class="site-footer__hours">Mon-Fri, 8:00 AM to 6:00 PM</p>
          </section>
        </div>
      </div>
      <div class="site-footer__bottom">
        <div class="container-wide">
          <p class="site-footer__legal">
            All Rights Reserved &copy; <span data-current-year></span> RGV Concrete Stain |
            <a class="footer-link" href="sitemap.xml">Sitemap</a> |
            <a class="footer-link footer-link--estimate" href="${siteConfig.pages.contact}#request-estimate">Request an Estimate</a>
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
        <button class="sticky-bar__link sticky-bar__link--schedule" type="button" data-open-estimate>Schedule a Call</button>
        <span class="sticky-bar__sep" aria-hidden="true">|</span>
        <a class="sticky-bar__link sticky-bar__link--phone" href="tel:${siteConfig.phoneHref}">Speak with an Expert Now</a>
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
        <button class="modal__close" type="button" aria-label="Close" data-close-estimate>&times;</button>
        <div class="modal__content">
          <div class="modal__intro flow">
            <span class="eyebrow">Discuss Your Project</span>
            <h2 id="estimate-modal-title">Get a Valley-Sized Estimate</h2>
            <p>
              Tell us what you are building or refinishing. This demo stores submissions locally so the launch site
              can later connect to the final CRM or form endpoint.
            </p>
          </div>
          <form class="lead-form" data-lead-form="modal-estimate">
            <div class="lead-form__grid">
              <div class="lead-form__field">
                <label for="estimate-name">Name</label>
                <input id="estimate-name" name="name" type="text" autocomplete="name" required />
              </div>
              <div class="lead-form__field">
                <label for="estimate-email">Email</label>
                <input id="estimate-email" name="email" type="email" autocomplete="email" required />
              </div>
              <div class="lead-form__field">
                <label for="estimate-phone">Phone</label>
                <input id="estimate-phone" name="phone" type="tel" autocomplete="tel" required />
              </div>
              <div class="lead-form__field">
                <label for="estimate-city">Project City</label>
                <select id="estimate-city" name="city" required>
                  <option value="">Select a city</option>
                  ${siteConfig.serviceArea.map((city) => `<option value="${city}">${city}</option>`).join("")}
                </select>
              </div>
              <div class="lead-form__field">
                <label for="estimate-service">Service</label>
                <select id="estimate-service" name="service" required>
                  <option value="">Choose a finish</option>
                  ${siteConfig.services.map((service) => `<option value="${service.label}">${service.label}</option>`).join("")}
                </select>
              </div>
              <div class="lead-form__field">
                <label for="estimate-size">Project Size</label>
                <select id="estimate-size" name="project-size" required>
                  <option value="">Select project size</option>
                  <option value="Under 500 sq. ft.">Under 500 sq. ft.</option>
                  <option value="500 - 1,500 sq. ft.">500 - 1,500 sq. ft.</option>
                  <option value="1,500 - 5,000 sq. ft.">1,500 - 5,000 sq. ft.</option>
                  <option value="5,000+ sq. ft.">5,000+ sq. ft.</option>
                </select>
              </div>
              <div class="lead-form__field lead-form__field--full">
                <label for="estimate-message">Project Details</label>
                <textarea
                  id="estimate-message"
                  name="message"
                  placeholder="Describe the condition of the slab, finish you want, target schedule, and anything that should be quoted."
                  required
                ></textarea>
              </div>
            </div>
            <div class="lead-form__status" data-form-status></div>
            <button class="btn btn--primary" type="submit">Request Proposal</button>
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
      if (window.innerWidth > 1200) return;

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
      if (window.innerWidth <= 1200) closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1200) closeNav();
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
        <img class="gallery-modal__image" alt="" />
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

    if (citySelect instanceof HTMLSelectElement && otherCityField instanceof HTMLElement && otherCityInput instanceof HTMLInputElement) {
      const syncOtherCity = () => {
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
      const requiredKeys = ["name", "email", "phone", "city", "service", "message"];
      const missing = requiredKeys.find((key) => !String(fields[key] || "").trim());

      if (missing) {
        status.textContent = "Please complete every required field before requesting pricing.";
        status.className = "lead-form__status is-error";
        return;
      }

      const email = String(fields.email || "");
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailValid) {
        status.textContent = "Enter a valid email address so the estimator can reply.";
        status.className = "lead-form__status is-error";
        return;
      }

      const payload = {
        ...fields,
        page,
        form: htmlForm.dataset.leadForm || "site-form",
        submittedAt: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem("rgvConcreteLeadForms") || "[]");
      existing.push(payload);
      localStorage.setItem("rgvConcreteLeadForms", JSON.stringify(existing));

      status.textContent =
        "Request captured in demo mode. Connect the final launch form to email or CRM before going live.";
      status.className = "lead-form__status is-success";
      htmlForm.reset();
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

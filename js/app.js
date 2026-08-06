/* ==========================================================================
   PORTFOLIO WEBSITE - INTERACTIVE APPLICATION LOGIC
   ========================================================================== */

// --- Dynamic Data Stores ---
const PROJECTS_DATA = {
  project1: {
    title: "ShopVibe E-Commerce",
    tags: ["React", "Node.js", "MongoDB", "Stripe API"],
    description: "ShopVibe is a high-performance e-commerce engine designed to support thousands of concurrent sessions. It provides an intuitive catalog browser, custom checkout forms, and automated invoice delivery.",
    solution: "Developed using React with Redux Toolkit for state management, and Node.js/Express.js on the backend server. Handled real-time inventory adjustments with MongoDB transactional locks. Standardized stripe checkouts with automated webhooks to protect customer transaction records.",
    metrics: ["98%", "80ms"],
    metricLabels: ["Lighthouse Perf", "API Latency"],
    links: {
      github: "https://github.com/example/shopvibe",
      live: "https://example.com/shopvibe"
    }
  },
  project2: {
    title: "FinPulse Analytics Dashboard",
    tags: ["Vue.js", "D3.js", "TailwindCSS"],
    description: "FinPulse is a professional financial analytics tool providing users with real-time tracking of portfolio distributions, historical trends, and stock indicators.",
    solution: "Built a customized dashboard layer utilizing Vue.js composition APIs. Integrated D3.js to render complex SVG line, area, and bar charts. Configured server-sent events (SSE) to fetch live index feeds, utilizing local storage caching to minimize bandwidth costs.",
    metrics: ["60 FPS", "< 1.2s"],
    metricLabels: ["Chart Render Speed", "Initial Load Time"],
    links: {
      github: "https://github.com/example/finpulse",
      live: "https://example.com/finpulse"
    }
  },
  project3: {
    title: "DocuMind Semantic AI",
    tags: ["Python", "OpenAI API", "PgVector", "Docker"],
    description: "DocuMind AI is a smart document lookup engine that allows organizations to search through complex manuals, policy documents, and archives via conversational queries.",
    solution: "Engineered using Python FastStream and LangChain patterns. Extracted document chunks and loaded vector embeddings through the OpenAI Text-Embedding API. Stored structures in a PgVector database to run cosine-similarity queries, enabling fast answer compilation.",
    metrics: ["94%", "1.1s"],
    metricLabels: ["Semantic Match Accuracy", "OpenAI Inference Time"],
    links: {
      github: "https://github.com/example/documind",
      live: "https://example.com/documind"
    }
  },
  project4: {
    title: "SyncTalk Chat Application",
    tags: ["React", "Socket.io", "Redis", "WebRTC"],
    description: "SyncTalk is a modern messaging and meeting space designed for remote squads. It supports persistent threads, file share uploads, and instant voice links.",
    solution: "Connected custom Socket.io server systems on Node.js to coordinate low-latency message broadcasts. Utilized Redis Pub/Sub mechanisms to support server scaling operations. Integrated WebRTC standards to enable video/audio streaming parameters between users.",
    metrics: ["< 40ms", "99.9%"],
    metricLabels: ["Message Latency", "Socket Connection Uptime"],
    links: {
      github: "https://github.com/example/synctalk",
      live: "https://example.com/synctalk"
    }
  },
  project5: {
    title: "MelodyGrid Synthesizer",
    tags: ["React", "WebAudio API", "Sass"],
    description: "MelodyGrid is a interactive web-based grid step sequencer and digital synthesizer allowing audio hobbyists to design synth lines directly inside modern browsers.",
    solution: "Utilized the native WebAudio API to synthesize saw, square, and triangle oscillators with filter nodes. Managed grid beat timers inside React utilizing precise audio scheduling offsets to prevent lag, exporting creations to WAV files.",
    metrics: ["0ms", "44.1kHz"],
    metricLabels: ["Input Audio Lag", "Synthesizer Sample Rate"],
    links: {
      github: "https://github.com/example/melodygrid",
      live: "https://example.com/melodygrid"
    }
  },
  project6: {
    title: "Nebula Container DevOps Engine",
    tags: ["AWS ECS", "Terraform", "Prometheus", "Golang"],
    description: "Nebula DevOps is a lightweight container deployment manager providing visual logs, target health reports, and CPU scalability configurations.",
    solution: "Coded backend microservices using Golang. Set up modular Infrastructure as Code configurations using Terraform templates on AWS. Implemented Prometheus nodes and Grafana collectors to feed telemetry metrics to custom panels.",
    metrics: ["-40%", "15s"],
    metricLabels: ["AWS Resource Cost Savings", "Average Container Spin-up Time"],
    links: {
      github: "https://github.com/example/nebula",
      live: "https://example.com/nebula"
    }
  }
};

const SERVICES_DATA = {
  "web-dev": {
    title: "Web Development",
    desc: "I design and code custom web applications focused on performance, accessibility, and high search engine discoverability.",
    deliverables: [
      "Custom responsive interface developments (React / Vue)",
      "Secure backend architecture configurations (Node.js / Express)",
      "High database speed indexing & optimizations",
      "Lighthouse Audits optimization scores of 95+"
    ],
    pricing: "Starting from $3,500",
    timeframe: "3 - 6 Weeks"
  },
  "app-dev": {
    title: "App Development",
    desc: "Creating smooth, native-feel cross-platform mobile apps for iOS and Android using modern systems.",
    deliverables: [
      "React Native custom frontend application interfaces",
      "App Store deployment configurations (Apple App Store / Google Play)",
      "Push notifications messaging setups & integration",
      "Local offline data caching setups using SQLite"
    ],
    pricing: "Starting from $5,000",
    timeframe: "4 - 8 Weeks"
  },
  "db-design": {
    title: "Database Design",
    desc: "Establishing structured, scalable databases optimized to handle heavy concurrent transaction workloads safely.",
    deliverables: [
      "Relational & Non-relational schema mapping & normalization",
      "Query profiling, execution analysis, and index tuning",
      "Data recovery configurations & security encryption parameters",
      "Data migration scripts & validation pipelines"
    ],
    pricing: "Starting from $2,000",
    timeframe: "2 - 4 Weeks"
  },
  "maintenance": {
    title: "Website Maintenance",
    desc: "Ongoing application support, server administration, dependency upgrades, and immediate glitch remedies.",
    deliverables: [
      "Continuous server uptime and error log monitoring",
      "Package dependency upgrades & security patch tests",
      "Daily backups and disaster recovery verification audits",
      "10 hours of dedicated minor revisions & edits monthly"
    ],
    pricing: "Starting from $400 / month",
    timeframe: "Ongoing Contract"
  },
  "consulting": {
    title: "Software Consulting",
    desc: "Guiding organizations on system design, technology migrations, cost reductions, and developer training workflows.",
    deliverables: [
      "Comprehensive system architecture review & audits",
      "Cloud budget and resource footprint recommendations (AWS/GCP)",
      "CI/CD workflow & deployment pipeline enhancements",
      "One-on-one developer pairing reviews"
    ],
    pricing: "Starting from $150 / Hour",
    timeframe: "Flexible / Retainer basis"
  }
};

// --- DOM Element References ---
const htmlElement = document.documentElement;
const themeToggleBtn = document.getElementById("theme-toggle");
const headerElement = document.getElementById("header");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const desktopNavLinks = document.querySelectorAll(".nav-link");
const scrollProgress = document.getElementById("scroll-progress");

// Modal Elements
const projectModal = document.getElementById("project-modal");
const serviceModal = document.getElementById("service-modal");
const successModal = document.getElementById("success-modal");

// Contact Form Elements
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const subjectInput = document.getElementById("contact-subject");
const messageInput = document.getElementById("contact-message");

// Global Map Variable
let leafletMap = null;
let mapMarker = null;
let tileLayer = null;

// --- Initialize Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNavigation();
  initScrollEffects();
  initPortfolioFilters();
  initIntersectionObserver();
  initModals();
  initContactForm();
  initLeafletMap();
});

// ==========================================================================
// 1. THEME SWITCHING (LIGHT / DARK)
// ==========================================================================
function initTheme() {
  // Check local storage or match system settings
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (systemPrefersDark) {
    setTheme("dark");
  } else {
    setTheme("dark"); // Default theme is dark
  }

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update map tile layers if map is initialized
  updateMapTheme(theme);
}

// ==========================================================================
// 2. MOBILE NAVIGATION
// ==========================================================================
function initMobileNavigation() {
  // Toggle menu on burger click
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = mobileMenuToggle.classList.contains("open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close menu when clicking mobile links
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Close menu on resize to desktop view
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains("open")) {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  mobileMenuToggle.classList.add("open");
  mobileMenuToggle.setAttribute("aria-expanded", "true");
  mobileNav.classList.add("open");
  // Prevent body scrolling when menu is open
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  mobileMenuToggle.classList.remove("open");
  mobileMenuToggle.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("open");
  document.body.style.overflow = "";
}

// ==========================================================================
// 3. SCROLL EFFECTS (Sticky Nav, Scroll Progress, Scroll-Spy)
// ==========================================================================
function initScrollEffects() {
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Sticky Nav Class Toggle
    if (scrollPos > 50) {
      headerElement.classList.add("scrolled");
    } else {
      headerElement.classList.remove("scrolled");
    }

    // Scroll Progress bar percentage calculate
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollPos / windowHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;

    // Scroll-Spy Link Highlighting
    let currentActiveSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // Offset for sticky header
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentActiveSectionId = section.getAttribute("id");
      }
    });

    if (currentActiveSectionId) {
      updateActiveNavLinks(currentActiveSectionId);
    }
  });
}

function updateActiveNavLinks(activeId) {
  // Desktop updates
  desktopNavLinks.forEach(link => {
    if (link.getAttribute("href") === `#${activeId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Mobile updates
  mobileNavLinks.forEach(link => {
    if (link.getAttribute("href") === `#${activeId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ==========================================================================
// 4. PORTFOLIO FILTERS
// ==========================================================================
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active from all buttons and add to clicked
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        // Custom animated fade filters
        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "flex";
          card.classList.add("revealed");
          // Quick timeout to trigger transition
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          // Set display none after opacity animation completes
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// ==========================================================================
// 5. INTERSECTION OBSERVER (Scroll Reveal Animations)
// ==========================================================================
function initIntersectionObserver() {
  const options = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    // Filter to find intersecting elements
    const intersectingEntries = entries.filter(entry => entry.isIntersecting);

    intersectingEntries.forEach((entry, index) => {
      // Stagger transitions by 100ms
      setTimeout(() => {
        entry.target.classList.add("revealed");
      }, index * 100);

      // Stop observing once animated
      observer.unobserve(entry.target);
    });
  }, options);

  // Bind sections, cards, and custom scroll elements
  const revealElements = document.querySelectorAll(
    ".animate-on-scroll, .animate-on-scroll-card, .scroll-animate"
  );
  revealElements.forEach(el => revealObserver.observe(el));
}

// ==========================================================================
// 6. DYNAMIC MODALS SYSTEM (PROJECT CASE STUDY & SERVICE DETAILS)
// ==========================================================================
let activeModal = null;
let lastActiveElement = null; // Accessibility: Restore focus

function initModals() {
  const projectModalClose = document.getElementById("project-modal-close");
  const serviceModalClose = document.getElementById("service-modal-close");
  const successModalClose = document.getElementById("success-modal-close");

  // Project Drawer Buttons
  document.querySelectorAll(".view-case-study").forEach(btn => {
    btn.addEventListener("click", (e) => {
      lastActiveElement = document.activeElement;
      const projectId = btn.getAttribute("data-project");
      openProjectModal(projectId);
    });
  });

  // Service Drawer Buttons
  document.querySelectorAll(".service-modal-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      lastActiveElement = document.activeElement;
      const serviceId = btn.getAttribute("data-service");
      openServiceModal(serviceId);
    });
  });

  // Bind Close triggers
  projectModalClose.addEventListener("click", () => closeModal(projectModal));
  serviceModalClose.addEventListener("click", () => closeModal(serviceModal));
  successModalClose.addEventListener("click", () => closeModal(successModal));

  // Close when clicking overlay backdrop
  [projectModal, serviceModal, successModal].forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Handle Keyboard accessibility (Escape to close and Focus Trap)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeModal) {
      closeModal(activeModal);
    }

    // Focus trapping loop
    if (e.key === "Tab" && activeModal) {
      handleModalFocusTrap(e, activeModal);
    }
  });
}

function openProjectModal(projectId) {
  const data = PROJECTS_DATA[projectId];
  if (!data) return;

  // Map fields to project modals
  document.getElementById("modal-project-title").innerText = data.title;

  // Set tags
  const tagsBox = document.getElementById("modal-project-tags");
  tagsBox.innerHTML = "";
  data.tags.forEach(t => {
    const pill = document.createElement("span");
    pill.className = "proj-tag";
    pill.innerText = t;
    tagsBox.appendChild(pill);
  });

  // Set visual representation
  const imageBox = document.getElementById("modal-project-image-box");
  imageBox.innerHTML = "";
  const gradDiv = document.createElement("div");
  // Select matching gradient styles
  const gradients = [
    "grad-blue-purple", "grad-purple-pink", "grad-blue-teal",
    "grad-dark-blue", "grad-orange-red", "grad-violet-indigo"
  ];
  const selectedGrad = gradients[Math.floor(Math.random() * gradients.length)];
  gradDiv.className = `project-img-fallback ${selectedGrad}`;
  gradDiv.innerHTML = `<i class="fa-solid fa-code-branch project-placeholder-icon"></i>`;
  imageBox.appendChild(gradDiv);

  // Set description paragraphs
  document.getElementById("modal-project-description").innerText = data.description;
  document.getElementById("modal-project-solution").innerText = data.solution;

  // Set custom metrics
  document.getElementById("modal-metric-1").innerText = data.metrics[0];
  document.getElementById("modal-metric-lbl-1").innerText = data.metricLabels[0];
  document.getElementById("modal-metric-2").innerText = data.metrics[1];
  document.getElementById("modal-metric-lbl-2").innerText = data.metricLabels[1];

  // Set link references
  const linksBox = document.getElementById("modal-project-links");
  linksBox.innerHTML = `
    <a href="${data.links.github}" target="_blank" class="btn btn-secondary btn-sm" rel="noopener noreferrer">
      <i class="fa-brands fa-github"></i> Repository
    </a>
    <a href="${data.links.live}" target="_blank" class="btn btn-primary btn-sm" rel="noopener noreferrer">
      <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Site
    </a>
  `;

  openModal(projectModal);
}

function openServiceModal(serviceId) {
  const data = SERVICES_DATA[serviceId];
  if (!data) return;

  document.getElementById("modal-service-title").innerText = data.title;
  document.getElementById("modal-service-full-desc").innerText = data.desc;

  // Populate deliverables bullet items
  const deliverablesList = document.getElementById("modal-service-deliverables");
  deliverablesList.innerHTML = "";
  data.deliverables.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    deliverablesList.appendChild(li);
  });

  document.getElementById("modal-service-pricing").innerText = data.pricing;
  document.getElementById("modal-service-timeframe").innerText = data.timeframe;

  openModal(serviceModal);
}

function openModal(modal) {
  activeModal = modal;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Shift focus to closing button
  setTimeout(() => {
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
    if (focusable.length > 0) focusable[0].focus();
  }, 100);
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeModal = null;

  // Restore focus to original trigger
  if (lastActiveElement) {
    lastActiveElement.focus();
    lastActiveElement = null;
  }
}

// Accessibility: Trapping Keyboard Focus loop inside overlays
function handleModalFocusTrap(e, modal) {
  const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) { // Shift + Tab back-loop
    if (document.activeElement === firstFocusable) {
      lastFocusable.focus();
      e.preventDefault();
    }
  } else { // Tab forward-loop
    if (document.activeElement === lastFocusable) {
      firstFocusable.focus();
      e.preventDefault();
    }
  }
}

// ==========================================================================
// 7. REAL-TIME CONTACT FORM VALIDATION & SUCCESS MODAL
// ==========================================================================
function initContactForm() {
  if (!contactForm) return;

  // Validate fields in real-time when inputs lose focus
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener("blur", () => {
      validateField(input);
    });
    input.addEventListener("input", () => {
      if (input.classList.contains("invalid")) {
        validateField(input);
      }
    });
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check all inputs
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isSubjectValid = validateField(subjectInput);
    const isMessageValid = validateField(messageInput);

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // Form successfully validated! Compile data and trigger modal
      const userName = nameInput.value.trim();

      // Inject user name in success message
      document.getElementById("submitted-user-name").innerText = userName;

      // Reset form variables
      contactForm.reset();

      // Remove any leftover styling states
      [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
        inp.classList.remove("invalid");
      });

      // Launch success modal
      openModal(successModal);
    }
  });
}

function validateField(input) {
  let isValid = true;
  const val = input.value.trim();

  if (input === nameInput) {
    isValid = val.length >= 2;
  } else if (input === emailInput) {
    // Standard validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(val);
  } else if (input === subjectInput) {
    isValid = val.length >= 3;
  } else if (input === messageInput) {
    isValid = val.length >= 10;
  }

  if (isValid) {
    input.classList.remove("invalid");
  } else {
    input.classList.add("invalid");
  }

  return isValid;
}

// ==========================================================================
// 8. INTERACTIVE LEAFLET MAP (OpenStreetMap wrapper)
// ==========================================================================
function initLeafletMap() {
  const mapElement = document.getElementById("leaflet-map");
  if (!mapElement) return;

  // San Francisco, CA Coordinates
  const sfCoords = [37.7749, -122.4194];

  // Initialize map object (Zoom level: 12)
  leafletMap = L.map('leaflet-map', {
    scrollWheelZoom: false // Prevent zoom scrolling interruptions
  }).setView(sfCoords, 12);

  // Set initial map theme tiles based on system state
  const initialTheme = htmlElement.getAttribute("data-theme") || "dark";
  tileLayer = L.tileLayer(getMapTileUrl(initialTheme), {
    maxZoom: 19,
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(leafletMap);

  // Custom marker configuration
  const customIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="
      width: 20px; 
      height: 20px; 
      border-radius: 50%; 
      background: #a855f7; 
      border: 3px solid #ffffff; 
      box-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  // Attach marker
  mapMarker = L.marker(sfCoords, { icon: customIcon })
    .addTo(leafletMap)
    .bindPopup(`<strong style="font-family: 'Outfit', sans-serif;">Alex Carter's Office</strong><br/>SoMa District, San Francisco, CA`)
    .openPopup();
}

function getMapTileUrl(theme) {
  // Beautiful styled maps with zero API keys required
  return theme === "light"
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Light Voyager
    : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"; // Dark Obsidian
}

function updateMapTheme(theme) {
  if (leafletMap && tileLayer) {
    // Update tile url and redraw layers
    tileLayer.setUrl(getMapTileUrl(theme));
  }
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

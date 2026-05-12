// Shared public-site navigation (Header + Footer)

// hash → element id on the Hero page
export const SCROLL_TARGETS = {
  "#home": null,
  "#programs": "programs-scroll-container",
  "#about": "about-section",
  "#news": "news-section",
};

// matches courses array order in Hero.jsx
export const COURSE_INDEX = {
  "information-system": 0,
  "marine-transportation": 1,
  "nursing": 2,
  "entrepreneurship": 3,
  "early-childhood-education": 4,
  "criminology": 5,
  "marine-engineering": 6,
  "tourism-management": 7,
  "technical-vocational-teacher": 8,
  "management-accounting": 9,
};

export function scrollToCourse(id) {
  const container = document.getElementById("programs-scroll-container");
  if (!container) return;
  const idx = COURSE_INDEX[id] ?? 0;
  const rect = container.getBoundingClientRect();
  const scrollTop = window.scrollY + rect.top + idx * window.innerHeight;
  window.scrollTo({ top: scrollTop, behavior: "smooth" });
}

export const NAV_LINKS = [
  { label: "Home", hash: "#home" },
  {
    label: "Courses",
    hash: "#programs",
    children: [
      { label: "Information System", id: "information-system" },
      { label: "Marine Transportation", id: "marine-transportation" },
      { label: "Marine Engineering", id: "marine-engineering" },
      { label: "Nursing", id: "nursing" },
      { label: "Entrepreneurship", id: "entrepreneurship" },
      { label: "Early Childhood Education", id: "early-childhood-education" },
      { label: "Criminology", id: "criminology" },
      { label: "Tourism Management", id: "tourism-management" },
      { label: "Tech-Voc Teacher Education", id: "technical-vocational-teacher" },
      { label: "Management Accounting", id: "management-accounting" },
    ],
  },
  { label: "About", hash: "#about" },
  { label: "News", hash: "#news" },
];

/** Course links only (for footer column, etc.) */
export const COURSE_NAV_ITEMS =
  NAV_LINKS.find((link) => link.children)?.children ?? [];

export function smoothScrollTo(id) {
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

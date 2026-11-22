// Topic columns on the homepage (_layouts/home.html, under the lead story).
// Each column shows the first 3 published posts from its list, skipping any post already
// shown in the lead story or the "Also new" list, so nothing repeats on the first screen.
// Drafts in a list are skipped until they are published, so they can be queued here early.
// `more` is where the column's "More" link goes.

module.exports = [
  {
    name: "Air quality and sensing",
    more: "/air-quality/",
    moreLabel: "Reading list",
    slugs: [
      "understanding-the-air-quality-index-aqi",
      "ambient-air-quality-standards-in-west-africa-the-current-state-2025",
      "top-websites-for-african-climate-data",
      "what-is-particulate-matter-pm2.5-and-the-environmental-significance",
      "different-sensor-networks-across-africa",
    ],
  },
  {
    name: "Computer vision and AI",
    more: "/categories/computer-vision/",
    moreLabel: "More",
    slugs: [
      "yolo-evolution-applications-and-current-trends-in-object-detection",
      "geographic-concentration-machine-learning-models",
      "understanding-gradients-with-loss-backward-in-pytorch",
      "why-vision-transformers-are-so-important",
    ],
  },
  {
    name: "Africa, tech and money",
    more: "/categories/money-fintech/",
    moreLabel: "More",
    slugs: [
      "why-are-flight-tickets-in-africa-so-expensive-who-gets-the-taxes-and-fees",
      "why-can-i-pay-for-netflix-instantly-but-not-send-money-abroad",
      "victor-b-lawrence-the-african-engineer-who-connected-the-world",
      "kiira-motors-kayoola-ev-from-uganda-to-south-africa",
    ],
  },
  {
    name: "Aerospace",
    more: "/categories/space-satellites/",
    moreLabel: "More",
    slugs: [
      "how-carnegie-mellon-sent-missions-to-the-moon-without-an-aerospace-department",
      "i-wanna-fly-an-introduction-to-the-aerospace-industry",
      "catching-the-super-heavy-booster-spacex",
      "explore-the-fascinating-world-of-satellite-orbits-with-keeptrack.space",
      "nasa-artemis-ii-update",
    ],
  },
];

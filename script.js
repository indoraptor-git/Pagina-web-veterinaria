document.documentElement.classList.add("motion-ready");

const revealTargets = document.querySelectorAll("[data-reveal]");

if (!("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => {
    element.dataset.visible = "true";
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.visible = "true";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.querySelector("#product-search");
const emptyMessage = document.querySelector("#empty-message");
let activeFilter = "Todos";

function updateProducts() {
  const search = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const categories = card.dataset.categories.split(" ");
    const matchesFilter =
      activeFilter === "Todos" || categories.includes(activeFilter);
    const matchesSearch = card.textContent.toLowerCase().includes(search);
    const visible = matchesFilter && matchesSearch;

    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  emptyMessage.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    updateProducts();
  });
});

searchInput.addEventListener("input", updateProducts);

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const answer = button.nextElementSibling;
    const symbol = button.querySelector("span");

    button.setAttribute("aria-expanded", String(!expanded));
    answer.hidden = expanded;
    symbol.textContent = expanded ? "+" : "−";
  });
});
document.documentElement.classList.add("motion-ready");

const revealTargets = document.querySelectorAll("[data-reveal]");

if (!("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => {
    element.dataset.visible = "true";
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
  );

  revealTargets.forEach((element) => observer.observe(element));
}
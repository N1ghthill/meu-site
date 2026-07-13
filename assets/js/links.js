const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    const firstIcon = document.querySelector(".link-icon i");
    const iconContent = firstIcon ? window.getComputedStyle(firstIcon, "::before").content : "";
    if (iconContent && iconContent !== "none" && iconContent !== '""') {
      document.documentElement.classList.add("icons-loaded");
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length > 0) {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 80, 260)}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
}

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Mobile menu toggle
document.getElementById("menu-btn").addEventListener("click", function (event) {
  event.stopPropagation();
  const mobileMenu = document.getElementById("mobile-menu");
  const dropdownMenuMobile = document.getElementById("dropdown-menu-mobile");

  mobileMenu.classList.toggle("opacity-0");
  mobileMenu.classList.toggle("-translate-y-4");

  if (mobileMenu.classList.contains("opacity-0")) {
    mobileMenu.classList.add("pointer-events-none");
    dropdownMenuMobile.classList.add("hidden");
  } else {
    mobileMenu.classList.remove("pointer-events-none");
  }
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Dropdown desktop
document.getElementById("dropdown-btn-desktop").addEventListener("click", function (event) {
  event.preventDefault();
  const dropdownMenu = document.getElementById("dropdown-menu-desktop");
  dropdownMenu.classList.toggle("opacity-0");
  dropdownMenu.classList.toggle("-translate-y-4");
  dropdownMenu.classList.toggle("pointer-events-none");
});

// Dropdown mobile
document.getElementById("dropdown-btn-mobile").addEventListener("click", function (event) {
  event.preventDefault();
  const dropdownMenu = document.getElementById("dropdown-menu-mobile");
  dropdownMenu.classList.toggle("hidden");
});

// Close menus on outside click
document.addEventListener("click", function (event) {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuBtn = document.getElementById("menu-btn");
  const dropdownMenuDesktop = document.getElementById("dropdown-menu-desktop");
  const dropdownBtnDesktop = document.getElementById("dropdown-btn-desktop");

  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickInsideMenuBtn = menuBtn.contains(event.target);
  const isClickInsideDropdownDesktop = dropdownMenuDesktop.contains(event.target) || dropdownBtnDesktop.contains(event.target);

  if (!mobileMenu.classList.contains("opacity-0") && !isClickInsideMenu && !isClickInsideMenuBtn) {
    mobileMenu.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
    document.getElementById("dropdown-menu-mobile").classList.add("hidden");
  }

  if (!dropdownMenuDesktop.classList.contains("opacity-0") && !isClickInsideDropdownDesktop) {
    dropdownMenuDesktop.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
  }
});

// Auto hover cards di mode mobile (home)
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("#program .group");

  if (window.innerWidth < 1000 && cards.length > 0) {
    const setActiveCard = () => {
      const middle = window.innerHeight / 2;

      let closestCard = null;
      let closestDistance = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(cardMiddle - middle);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }
      });

      if (closestCard) {
        cards.forEach((card) => card.classList.remove("hover"));
        closestCard.classList.add("hover");
      }
    };

    // Jalankan pertama kali
    setActiveCard();

    // Jalankan saat scroll
    window.addEventListener("scroll", setActiveCard);
  }
});

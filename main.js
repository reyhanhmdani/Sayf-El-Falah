// =======================
// INIT AOS
// =======================
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// =======================
// MOBILE MENU TOGGLE
// =======================
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

// =======================
// NAVBAR SCROLL EFFECT
// =======================
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// =======================
// DROPDOWN DESKTOP
// =======================
document.getElementById("dropdown-btn-desktop").addEventListener("click", function (event) {
  event.preventDefault();
  const dropdownMenu = document.getElementById("dropdown-menu-desktop");
  dropdownMenu.classList.toggle("opacity-0");
  dropdownMenu.classList.toggle("-translate-y-4");
  dropdownMenu.classList.toggle("pointer-events-none");
});

// =======================
// DROPDOWN MOBILE
// =======================
document.getElementById("dropdown-btn-mobile").addEventListener("click", function (event) {
  event.preventDefault();
  const dropdownMenu = document.getElementById("dropdown-menu-mobile");
  dropdownMenu.classList.toggle("hidden");
});

// =======================
// CLOSE MENUS ON OUTSIDE CLICK
// =======================
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

// =======================
// AUTO HOVER CARDS FUNCTION
// =======================
function autoHoverCards(sectionId, mode = "center") {
  const section = document.querySelector(sectionId);
  if (!section) return;

  const cards = section.querySelectorAll(".group");

  if (window.innerWidth < 1000 && cards.length > 0) {
    if (mode === "center") {
      // Mode titik tengah (home)
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

        cards.forEach((card) => card.classList.remove("hover"));
        if (closestCard) closestCard.classList.add("hover");
      };

      setActiveCard();
      window.addEventListener("scroll", setActiveCard);
    } else if (mode === "observer") {
      // Mode intersection observer (kbtk, sd, ponpes)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("hover");
            } else {
              entry.target.classList.remove("hover");
            }
          });
        },
        { root: null, threshold: 1.0 }
      );

      cards.forEach((card) => observer.observe(card));
    }
  }
}

// =======================
// CALL AUTO HOVER
// =======================

// Home
autoHoverCards("#program", "center");

// KB-TK
autoHoverCards("#program-kbtk", "center");

// SD
autoHoverCards("#program-sd", "observer");

// Ponpes
autoHoverCards("#program-ponpes", "observer");

// GALLERY
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeBtn = document.getElementById("closeLightbox");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");

  let currentIndex = 0;

  // buka lightbox
  function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = galleryItems[currentIndex].src;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
  }

  // tutup lightbox
  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
  }

  // gambar sebelumnya
  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImage.src = galleryItems[currentIndex].src;
  }

  // gambar selanjutnya
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImage.src = galleryItems[currentIndex].src;
  }

  // klik gambar gallery
  galleryItems.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // tombol close
  closeBtn.addEventListener("click", closeLightbox);

  // tombol prev/next
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  // tombol keyboard
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("hidden")) {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") closeLightbox();
    }
  });

  // klik background tutup modal
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
});

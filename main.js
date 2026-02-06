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
// NAVBAR SCROLL EFFECT (GLASSMORPHISM)
// =======================
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    // Add Glassmorphism (Dark Blue/Secondary with Blur)
    navbar.classList.add("bg-secondary/90", "backdrop-blur-md", "shadow-lg");
    navbar.classList.remove("py-4");
    navbar.classList.add("py-2");
  } else {
    // Transparent State
    navbar.classList.remove("bg-secondary/90", "backdrop-blur-md", "shadow-lg");
    navbar.classList.add("py-4");
    navbar.classList.remove("py-2");
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
      const setActiveCards = () => {
        const middle = window.innerHeight / 2;
        const threshold = 150; // toleransi area tengah

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardMiddle = rect.top + rect.height / 2;
          const distance = Math.abs(cardMiddle - middle);

          if (distance <= threshold) {
            card.classList.add("hover");
          } else {
            card.classList.remove("hover");
          }
        });
      };

      setActiveCards(); // ✅ pakai yang benar
      window.addEventListener("scroll", setActiveCards);
    } else if (mode === "observer") {
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
        { root: null, threshold: 0.9 }
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
autoHoverCards("#program-sd", "center");

// Ponpes
autoHoverCards("#program-ponpes", "center");

// GALLERY
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return; // Exit if lightbox doesn't exist

  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeBtn = document.getElementById("closeLightbox");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");
  const lightboxThumbnails = document.getElementById("lightboxThumbnails");

  let currentIndex = 0;

  // buka lightbox
  function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = galleryItems[currentIndex].src;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    updateThumbnails();
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
    updateThumbnails();
  }

  // gambar selanjutnya
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImage.src = galleryItems[currentIndex].src;
    updateThumbnails();
  }

  // Update thumbnails highlight
  function updateThumbnails() {
    if (!lightboxThumbnails) return;
    const thumbnails = lightboxThumbnails.querySelectorAll("img");
    thumbnails.forEach((thumb, idx) => {
        if (idx === currentIndex) {
            thumb.classList.add("border-primary", "border-2");
            thumb.classList.remove("opacity-60");
        } else {
            thumb.classList.remove("border-primary", "border-2");
            thumb.classList.add("opacity-60");
        }
    });
    
    // Scroll thumbnail active ke view
    if(thumbnails[currentIndex]) {
        thumbnails[currentIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }

  // Generate Thumbnails
  if (lightboxThumbnails && galleryItems.length > 0) {
      lightboxThumbnails.innerHTML = ""; // Clear existing
      galleryItems.forEach((item, index) => {
          const thumb = document.createElement("img");
          thumb.src = item.src;
          thumb.className = "h-16 w-24 object-cover rounded cursor-pointer transition-opacity duration-300 opacity-60 flex-shrink-0";
          thumb.addEventListener("click", () => openLightbox(index));
          lightboxThumbnails.appendChild(thumb);
      });
  }

  // klik gambar gallery
  galleryItems.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // tombol close
  if(closeBtn) closeBtn.addEventListener("click", closeLightbox);

  // tombol prev/next
  if(prevBtn) prevBtn.addEventListener("click", showPrev);
  if(nextBtn) nextBtn.addEventListener("click", showNext);

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

// klik gambar Kurikulum SD
const thumbnailContainer = document.getElementById("thumbnail-trigger");
if (thumbnailContainer) {
    const modal = document.getElementById("modal-image");
    const modalImage = modal ? modal.querySelector("img") : null;
    const closeButton = document.getElementById("modal-close");

    function openModal() {
      // Dapatkan URL gambar yang saat ini ditampilkan oleh browser
      const img = thumbnailContainer.querySelector("img");
      const currentSrc = img.currentSrc || img.src;

      // Atur URL gambar modal sesuai dengan gambar yang sedang ditampilkan
      if (modalImage) modalImage.src = currentSrc;

      if (modal) {
          modal.classList.remove("hidden");
          modal.classList.add("flex");
          document.body.style.overflow = "hidden";
      }
    }

    function closeModal() {
      if (modal) {
          modal.classList.remove("flex");
          modal.classList.add("hidden");
      }
      document.body.style.overflow = "auto";
      if (modalImage) modalImage.src = ""; // Kosongkan URL gambar saat ditutup
    }

    thumbnailContainer.addEventListener("click", openModal);
    if (closeButton) closeButton.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            closeModal();
          }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
  // --- Seleksi Elemen ---
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenuContainer = document.getElementById("mobile-menu-container");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const navLinksMobile = document.querySelectorAll("#mobile-menu-container a[data-nav-link]");
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const line3 = document.getElementById("line3");

  const mainNav = document.getElementById("mainNav");
  // const navLinksDesktop = document.querySelectorAll("#mainNav .space-x-8 a, #mainNav .space-x-8 summary"); // Hapus baris ini
  const backToTopButton = document.getElementById("backToTop");

  // ----------------------------------------------------
  // Fungsi untuk Menu Mobile
  // ----------------------------------------------------
  const toggleMobileMenu = () => {
    mobileMenuContainer.classList.toggle("-translate-x-full");
    mobileMenuOverlay.classList.toggle("opacity-0");
    mobileMenuOverlay.classList.toggle("invisible");

    line1.classList.toggle("rotate-45");
    line1.classList.toggle("translate-y-1.5");
    line2.classList.toggle("opacity-0");
    line3.classList.toggle("-rotate-45");
    line3.classList.toggle("-translate-y-1.5");
  };

  hamburgerButton.addEventListener("click", toggleMobileMenu);
  mobileMenuOverlay.addEventListener("click", toggleMobileMenu);

  navLinksMobile.forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileMenuContainer.classList.contains("-translate-x-full")) {
        toggleMobileMenu();
      }
    });
  });

  // ----------------------------------------------------
  // Fungsi untuk Efek Scroll (hanya Back to Top)
  // ----------------------------------------------------
  const handleScroll = () => {
    // Tampilkan/sembunyikan tombol Back to Top
    const isFarDown = window.scrollY > 300;
    if (backToTopButton) {
      backToTopButton.classList.toggle("opacity-100", isFarDown);
      backToTopButton.classList.toggle("visible", isFarDown);
      backToTopButton.classList.toggle("opacity-0", !isFarDown);
      backToTopButton.classList.toggle("invisible", !isFarDown);
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // ----------------------------------------------------
  // Smooth Scrolling untuk Anchor Links
  // ----------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") {
        return;
      }
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = mainNav.offsetHeight;
        const offsetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

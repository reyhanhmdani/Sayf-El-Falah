// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Mobile menu toggle
document.getElementById("menu-btn").addEventListener("click", function (event) {
  event.stopPropagation(); // Mencegah event klik menyebar ke dokumen
  const mobileMenu = document.getElementById("mobile-menu");
  const dropdownMenuMobile = document.getElementById("dropdown-menu-mobile");

  // Toggle kelas untuk animasi menu utama
  mobileMenu.classList.toggle("opacity-0");
  mobileMenu.classList.toggle("-translate-y-4");

  // Toggle pointer-events
  if (mobileMenu.classList.contains("opacity-0")) {
    mobileMenu.classList.add("pointer-events-none");
    // Tutup dropdown jika menu utama ditutup
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

// Logika untuk dropdown desktop
document.getElementById("dropdown-btn-desktop").addEventListener("click", function (event) {
  event.preventDefault();
  const dropdownMenu = document.getElementById("dropdown-menu-desktop");
  dropdownMenu.classList.toggle("opacity-0");
  dropdownMenu.classList.toggle("-translate-y-4");
  dropdownMenu.classList.toggle("pointer-events-none");
});

// Logika untuk dropdown mobile
document.getElementById("dropdown-btn-mobile").addEventListener("click", function (event) {
  event.preventDefault();
  const dropdownMenu = document.getElementById("dropdown-menu-mobile");
  dropdownMenu.classList.toggle("hidden");
});

// Event listener untuk menutup menu mobile dan dropdown saat klik di luar
document.addEventListener("click", function (event) {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuBtn = document.getElementById("menu-btn");
  const dropdownMenuDesktop = document.getElementById("dropdown-menu-desktop");
  const dropdownBtnDesktop = document.getElementById("dropdown-btn-desktop");

  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickInsideMenuBtn = menuBtn.contains(event.target);
  const isClickInsideDropdownDesktop = dropdownMenuDesktop.contains(event.target) || dropdownBtnDesktop.contains(event.target);

  // Tutup menu mobile jika klik di luar area menu dan tombolnya
  if (!mobileMenu.classList.contains("opacity-0") && !isClickInsideMenu && !isClickInsideMenuBtn) {
    mobileMenu.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
    // Pastikan dropdown mobile juga tertutup saat menu utama ditutup
    document.getElementById("dropdown-menu-mobile").classList.add("hidden");
  }

  // Tutup dropdown desktop jika klik di luar area dropdown
  if (!dropdownMenuDesktop.classList.contains("opacity-0") && !isClickInsideDropdownDesktop) {
    dropdownMenuDesktop.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("#program-kbtk .group");

  if (window.innerWidth < 1000) {
    // hanya mobile
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hover"); // aktifkan efek hover
          } else {
            entry.target.classList.remove("hover"); // nonaktif kalau keluar layar
          }
        });
      },
      {
        root: null,
        threshold: 0.6, // aktif kalau 60% card ada di layar
      }
    );

    cards.forEach((card) => observer.observe(card));
  }
});

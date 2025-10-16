// =============================================================================
// NAVBAR TOGGLE (Disabled for Mobile - Only Desktop Use)
// =============================================================================
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

if (window.innerWidth > 768) {
  // Only enable toggle on desktop
  menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });
}

// =============================================================================
// HERO IMAGE HOVER EFFECT
// =============================================================================
const heroImage = document.querySelector(".hero-image");

if (heroImage) {
  heroImage.addEventListener("mouseenter", () => {
    heroImage.style.transform = "scale(1.05)";
  });

  heroImage.addEventListener("mouseleave", () => {
    heroImage.style.transform = "scale(1)";
  });
}

// =============================================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// =============================================================================
function slowScroll(targetSelector, duration = 1000) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const start = window.pageYOffset;
  const end = target.offsetTop - 70; // adjust for navbar
  const distance = end - start;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, start, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    slowScroll(this.getAttribute("href"), 2000); // 2 seconds
  });
});

// =============================================================================
// SKILL CARD CLICK WITH PRESS EFFECT + PAGE TRANSITION
// =============================================================================
const skillLinks = document.querySelectorAll(".skill-link");

skillLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // stop default navigation
    const card = this.querySelector(".skill-card");
    const targetURL = this.getAttribute("href");

    // 1️⃣ Press effect
    card.classList.add("clicked");

    // 2️⃣ After press animation, start page transition
    setTimeout(() => {
      document.body.classList.add("fade-out");

      // Navigate after fade-out animation
      setTimeout(() => {
        window.location.href = targetURL;
      }, 600); // match fade-out duration
    }, 300); // match clickZoom duration
  });
});

// =============================================================================
// FADE IN EFFECT ON PAGE LOAD
// =============================================================================
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  // Remove the class after animation to avoid issues
  setTimeout(() => {
    document.body.classList.remove("fade-in");
  }, 600);
});

// =============================================================================
// ABOUT PAGE: SMOOTH CROSS-FADE SLIDESHOW
// =============================================================================
const slideshowImages = ["images/1.jpg", "images/2.jpg", "images/3.jpg"];
let currentIndex = 0;
const slideshowElement = document.getElementById("slideshow");

// Preload all images (so fade is smooth with no load lag)
if (slideshowElement) {
  slideshowImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % slideshowImages.length;
    const nextImage = slideshowImages[nextIndex];

    // Fade out current image
    slideshowElement.style.opacity = 1;

    // Switch image while fading
    setTimeout(() => {
      slideshowElement.src = nextImage;
      slideshowElement.style.opacity = 1;
      currentIndex = nextIndex;
    }, 400); // overlap timing (switch happens mid-fade)
  }, 5000); // change every 5 seconds
}

// =============================================================================
// GRAPHIC DESIGNING PAGE: GALLERY AND LIGHTBOX
// =============================================================================
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

if (gallery && lightbox) {
  // Automatically add 57 images
  for (let i = 1; i <= 57; i++) {
    const img = document.createElement("img");
    img.src = `images/gallery/${i}.jpg`;
    img.alt = `Gallery Image ${i}`;
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
    gallery.appendChild(img);
  }

  // Close lightbox
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
}

// =============================================================================
// GALLERY FADE-IN ON SCROLL (For Graphic Designing Page)
// =============================================================================
function handleScroll() {
  const images = document.querySelectorAll(".gallery img");
  images.forEach((img) => {
    const imgTop = img.getBoundingClientRect().top;
    const imgVisible = 150;

    if (imgTop < window.innerHeight - imgVisible) {
      img.classList.add("show");
    }
  });
}

window.addEventListener("scroll", handleScroll);
handleScroll(); // Initial check

// =============================================================================
// Data engineering section
// =============================================================================
// Scroll animation for roadmap
// Scroll animation for roadmap
const timelineItems = document.querySelectorAll(".timeline-item");

window.addEventListener("scroll", () => {
  timelineItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (itemTop < windowHeight - 100) {
      item.classList.add("visible");
    }
  });
});

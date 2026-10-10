
// ===== HOMEPAGE IMAGE CAROUSEL =====

const images = document.querySelectorAll(".carousel-image");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.previous");

if (images.length > 0) {
    let currentSlide = 0;
    let timer;

    function showSlide(index) {
        currentSlide = (index + images.length) % images.length;

        images.forEach((image, i) => {
            image.classList.toggle("active-image", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active-dot", i === currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            showSlide(currentSlide + 1);
            resetTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            showSlide(currentSlide - 1);
            resetTimer();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetTimer();
        });
    });

    function startTimer() {
        timer = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    showSlide(0);
    startTimer();
}


// ===== ABOUT ME ANIMATED COUNTERS =====

document.querySelectorAll(".counter").forEach(counter => {
    const target = Number(counter.dataset.target);

    if (!Number.isFinite(target)) return;

    const duration = 1200;
    const startTime = performance.now();

    function updateCounter(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        counter.textContent = Math.floor(target * eased);

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + "+";
        }
    }

    requestAnimationFrame(updateCounter);
});
// ===== PROJECTS: ARTWORK CAROUSEL =====

document.querySelectorAll(".artwork-carousel").forEach(carousel => {
    const slides = carousel.querySelectorAll(".artwork-slide");
    const dots = carousel.querySelectorAll(".artwork-dot");
    const prev = carousel.querySelector(".artwork-prev");
    const next = carousel.querySelector(".artwork-next");

    const instagramURL =
        "https://www.instagram.com/_trinity_floofx_?psln=bzR5cG41eWptaGFv";

    let current = 0;

    function showArtwork(index) {
        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === current);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === current);
        });
    }

    prev.addEventListener("click", event => {
        event.stopPropagation();
        showArtwork(current - 1);
    });

    next.addEventListener("click", event => {
        event.stopPropagation();
        showArtwork(current + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", event => {
            event.stopPropagation();
            showArtwork(index);
        });
    });

    carousel.addEventListener("click", event => {
        if (event.target.closest("button")) return;
        window.open(instagramURL, "_blank", "noopener,noreferrer");
    });

    carousel.addEventListener("keydown", event => {
        if (event.target !== carousel) return;

        if (event.key === "Enter") {
            window.open(instagramURL, "_blank", "noopener,noreferrer");
        }

        if (event.key === "ArrowRight") showArtwork(current + 1);
        if (event.key === "ArrowLeft") showArtwork(current - 1);
    });

    showArtwork(0);
});
// LOAD THE OTHER HTML PAGES

async function loadPage(file, containerId) {
    const response = await fetch(file);
    const html = await response.text();

    const doc = new DOMParser().parseFromString(html, "text/html");
    const container = document.getElementById(containerId);

    // Copy the page's visible content, not its HTML/head/body wrappers
   const mainContent = doc.body.cloneNode(true);

// Remove navigation and scripts from the loaded page
mainContent.querySelectorAll(".navbar, script").forEach(el => el.remove());

// Load all remaining content, including the projects heading
container.innerHTML = mainContent.innerHTML;
}

async function loadPortfolio() {
    await loadPage("About-me.html", "about");
    await loadPage("Projects.html", "projects");
    await loadPage("contact-me.html", "contact");
}
async function loadPortfolio() {
    await loadPage("About-me.html", "about");
    initCounters();

    await loadPage("Projects.html", "projects");
    await loadPage("contact-me.html", "contact");
}

loadPortfolio();
function initCounters() {
const counters = document.querySelectorAll("#about .counter");
if (!counters.length) return;
    const aboutSection = document.getElementById("about");
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    counters.forEach(counter => {
        // Animate only once
            if (counter.dataset.started === "true") return;
                    counter.dataset.started = "true";
                    const target = Number(counter.dataset.target);
                    const duration = 1500;
                    const startTime = performance.now();
                    function updateCounter(currentTime) {
                        const progress = Math.min(
                            (currentTime - startTime) / duration,
                            1
                        );

                        counter.textContent = Math.floor(
                            target * progress
                        );

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                });

                // Stop observing after the first animation
                observer.unobserve(aboutSection);
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(aboutSection);
}

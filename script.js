
/* MOBILE NAVIGATION */
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuIcon.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }
});

/* CLOSE MOBILE MENU */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        const icon = menuIcon.querySelector("i");
        icon.classList.replace("fa-xmark", "fa-bars");
    });
});

/* SKILLS ANIMATION */
const skillsSection = document.querySelector(".skills");

const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillsSection.classList.add("show");
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

skillsObserver.observe(skillsSection);

/* BACK TO TOP */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ACTIVE NAVIGATION */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.id;
        }
    });

    navItems.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });
});

/* REVEAL ANIMATIONS */
const revealElements = document.querySelectorAll(
    ".about, .services, .projects, .contact"
);

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});

/* FORMSPREE CONTACT FORM */
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (submitBtn.disabled) return;

    const formData = new FormData(contactForm);

    submitBtn.disabled = true;

    // Keep original button design while loading
    submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';

    formStatus.textContent = "";
    formStatus.className = "";

    try {

        const response = await fetch(
            "https://formspree.io/f/xrppnkdj",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const result = await response.json();

        if (!response.ok) {

            const message = result.errors
                ? result.errors.map(error => error.message).join(", ")
                : "Something went wrong. Please try again.";

            throw new Error(message);
        }

        formStatus.textContent =
            "Your message has been sent successfully! Thank you.";

        formStatus.className = "success";

        contactForm.reset();

    } catch (error) {

        formStatus.textContent =
            error.message || "Unable to send message. Please try again.";

        formStatus.className = "error";

    } finally {

        submitBtn.disabled = false;

        // Restore original button label and icon
        submitBtn.innerHTML =
            '<i class="fas fa-paper-plane"></i> Send Message';
    }

});

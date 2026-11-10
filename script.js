
const contactForm = document.getElementById("contactForm");

const submitBtn = document.getElementById("submitBtn");

const formStatus = document.getElementById("formStatus");

/* FORMSPREE SUBMISSION */
contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (submitBtn.disabled) return;

    const formData = new FormData(contactForm);

    submitBtn.disabled = true;

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

            const errorMessage = result.errors
                ? result.errors.map(error => error.message).join(", ")
                : "Unable to send your message.";

            throw new Error(errorMessage);
        }

        formStatus.textContent =
            "Message sent successfully! Thank you for contacting me.";

        formStatus.className = "success";

        contactForm.reset();

    } catch (error) {

        formStatus.textContent =
            error.message || "Something went wrong. Please try again.";

        formStatus.className = "error";

    } finally {

        submitBtn.disabled = false;

        submitBtn.innerHTML =
            '<i class="fas fa-paper-plane"></i> Send Message';
    }

});

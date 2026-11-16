
// CONTACT FORM
const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("formStatus");

if (form && statusMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');

    statusMessage.textContent = "Sending your message...";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    const formData = new FormData(form);

    formData.append("_subject", "New Portfolio Inquiry");
    formData.append("_template", "table");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        }
      );

      const result = await response.json();

      if (String(result.success).toLowerCase() === "true") {
        statusMessage.textContent =
          "Thank you! Your message has been sent successfully.";

        form.reset();
      } else {
        statusMessage.textContent =
          "Message not sent: " +
          (result.message || "Please check your email activation and try again.");

        console.error("FormSubmit error:", result);
      }

    } catch (error) {
      statusMessage.textContent =
        "Connection error. Please try again.";

      console.error("Contact form error:", error);

    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
}

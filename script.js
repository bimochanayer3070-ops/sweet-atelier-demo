const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");

const modalBackdrop = document.querySelector("#modalBackdrop");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalClose = document.querySelector("#modalClose");
const modalEnquire = document.querySelector("#modalEnquire");

const enquiryForm = document.querySelector("#enquiryForm");
const toast = document.querySelector("#toast");


const cakeDescriptions = {
    "Rosé Celebration":
        "A sample celebration cake with soft colours and elegant decorations. Final flavours, size, and price would need to be confirmed with the shop.",

    "Midnight Cocoa":
        "A chocolate-inspired cake concept. Ingredients, sizes, availability, and prices are placeholders in this demo.",

    "Vanilla Garden":
        "A classic cake concept with a simple, timeless look. Replace this description with approved product details.",

    "Berry Blush":
        "A festive cake concept with a berry-inspired style. This does not represent a confirmed product or price."
};


// Show a small notification

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// Mobile navigation menu

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
});


// Close mobile menu after choosing a section

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.textContent = "☰";
    });
});


// Cake category filters

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(filter => {
            filter.classList.toggle("active", filter === button);
        });

        productCards.forEach(card => {
            const categories = card.dataset.category.split(/\s+/);

            const shouldShow =
                selectedCategory === "all" ||
                categories.includes(selectedCategory);

            card.hidden = !shouldShow;
        });
    });
});


// Open a product details popup

function openProductDetails(productName) {
    modalTitle.textContent = productName;

    modalText.textContent =
        cakeDescriptions[productName] ||
        "Sample product information.";

    modalBackdrop.classList.add("open");
    modalClose.focus();
}


// Close the popup

function closeProductDetails() {
    modalBackdrop.classList.remove("open");
}


// Connect the product detail buttons

document.querySelectorAll(".details-button").forEach(button => {
    button.addEventListener("click", () => {
        openProductDetails(button.dataset.product);
    });
});

modalClose.addEventListener("click", closeProductDetails);


// Close popup by clicking outside it

modalBackdrop.addEventListener("click", event => {
    if (event.target === modalBackdrop) {
        closeProductDetails();
    }
});


// Close popup with Escape key

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProductDetails();
    }
});


// Go to the sample enquiry form

modalEnquire.addEventListener("click", () => {
    closeProductDetails();

    document.querySelector("#custom").scrollIntoView({
        behavior: "smooth"
    });

    showToast(
        "Demo only: the enquiry form does not send information."
    );
});


// Sample form: validates the fields but does not send or store data

enquiryForm.addEventListener("submit", event => {
    event.preventDefault();

    const customerName =
        document.querySelector("#customerName").value.trim();

    const occasion =
        document.querySelector("#occasion").value;

    if (!customerName || !occasion) {
        showToast("Please enter your name and choose an occasion.");
        return;
    }

    showToast(
        "Demo preview only. No information was sent or stored."
    );

    enquiryForm.reset();
});
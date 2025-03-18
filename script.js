document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.getElementById("navLinks");
    const toggleButton = document.querySelector(".menu-toggle");

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});

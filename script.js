document.addEventListener("DOMContentLoaded", function () {
    alert("Neural Queens welcomes you to DotVision!");
    
    const navLinks = document.getElementById("navLinks");
    const toggleButton = document.querySelector(".menu-toggle");

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});

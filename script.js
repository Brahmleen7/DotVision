document.querySelector(".menu-toggle").addEventListener("click", function() {
    const mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
});

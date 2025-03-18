document.addEventListener("DOMContentLoaded", function () {
    // Show alert only once per session
    if (!sessionStorage.getItem("welcomeShown")) {
        alert("Neural Queens welcomes you to DotVision!");
        sessionStorage.setItem("welcomeShown", "true"); // Store flag in sessionStorage
    }

    const navLinks = document.getElementById("navLinks");
    const toggleButton = document.querySelector(".menu-toggle");

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});

// Display image preview
document.getElementById("imageInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("imagePreview").src = e.target.result;
            document.getElementById("imagePreview").style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid PNG or JPG image.");
    }
});

// Upload image to CNN Model API
function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    if (fileInput.files.length === 0) {
        alert("Please select an image first.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Show loading message
    document.getElementById("outputText").innerText = "Processing image, please wait...";

    fetch("http://127.0.0.1:5000/predict", { // Replace with your deployed API URL
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("outputText").innerText = "AI Output: " + data.result;
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to process the image.");
        document.getElementById("outputText").innerText = "";
    });
}


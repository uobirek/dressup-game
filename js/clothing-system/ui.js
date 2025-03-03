function showTab(category) {
    document.querySelectorAll(".tab-content").forEach(section => {
        section.style.display = "none";
    });

    document.querySelectorAll(".tab-button").forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById(`tab-${category}`).style.display = "block";

    document.querySelector(`.tab-button:nth-child(${Object.keys(clothingOptions).indexOf(category) + 1})`).classList.add("active");
}

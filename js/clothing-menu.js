const clothingOptions = {
    top: 7,
    bottom: 4,
    shoes: 3,
    socks: 3,
    hairBack: 3,
    hairFront: 2,
    accessory: 5,
};

function generateClothingTabs() {
    const menu = document.querySelector(".clothes-menu");

    // Create tab container
    const tabContainer = document.createElement("div");
    tabContainer.classList.add("tab-container");

    // Create content container
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("tab-content-container");

    // Iterate over categories
    Object.keys(clothingOptions).forEach((category, index) => {
        // Create tab button
        let tabButton = document.createElement("button");
        tabButton.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        tabButton.classList.add("tab-button");
        if (index === 0) tabButton.classList.add("active"); // Set first tab as active
        tabButton.onclick = () => showTab(category);

        tabContainer.appendChild(tabButton);

        // Create content section
        let section = document.createElement("div");
        section.classList.add("tab-content");
        section.id = `tab-${category}`;
        if (index !== 0) section.style.display = "none"; // Hide all but first


        // Generate clothing buttons
        for (let i = 1; i <= clothingOptions[category]; i++) {
            let button = document.createElement("button");

            let previewImg = document.createElement("img");
            previewImg.src = `assets/dressup/${category}_${i}.png`;
            previewImg.classList.add("clothing-preview", category);

            let previewDiv = document.createElement("div");
            previewDiv.appendChild(previewImg);

            button.appendChild(previewDiv);
            button.onclick = () => changeClothes(category, `${category}_${i}.png`);
            makeDraggable(previewDiv);
            section.appendChild(button);
        }

        // Create "Remove" button
        let removeButton = document.createElement("button");
        removeButton.textContent = `Remove ${category}`;
        removeButton.classList.add("remove-button");
        removeButton.onclick = () => changeClothes(category, "");
        section.appendChild(removeButton);
        makeDraggable(removeButton);

        contentContainer.appendChild(section);
    });

    // Append to menu
    menu.appendChild(tabContainer);
    menu.appendChild(contentContainer);
}

function showTab(category) {
    // Hide all content sections
    document.querySelectorAll(".tab-content").forEach(section => {
        section.style.display = "none";
    });

    // Remove active class from all tab buttons
    document.querySelectorAll(".tab-button").forEach(button => {
        button.classList.remove("active");
    });

    // Show selected tab content
    document.getElementById(`tab-${category}`).style.display = "block";

    // Highlight the active tab
    document.querySelector(`.tab-button:nth-child(${Object.keys(clothingOptions).indexOf(category) + 1})`).classList.add("active");
}

document.addEventListener("DOMContentLoaded", generateClothingTabs);

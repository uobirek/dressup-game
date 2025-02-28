function makeDraggable(element, category, item) {
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;
    let originalParent = element.parentElement; // Save original position
    let originalTransform = element.style.transform;

    element.style.transform = "translate3d(0px, 0px, 0px)";
    element.style.position = "absolute";
    element.style.willChange = "transform";

    element.addEventListener("mousedown", (e) => {
        e.preventDefault();

        startX = e.clientX - translateX;
        startY = e.clientY - translateY;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    function onMouseMove(e) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;

        element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`;
    }

    function onMouseUp(e) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        let character = document.getElementById("character"); // Get the character element
        let charRect = character.getBoundingClientRect();
        let elemRect = element.getBoundingClientRect();

        // Check if the dragged item is inside the character area
        let isInside =
            elemRect.left >= charRect.left &&
            elemRect.right <= charRect.right &&
            elemRect.top >= charRect.top &&
            elemRect.bottom <= charRect.bottom;

        if (isInside) {
            // Drop on character -> Change clothes
            changeClothes(category, item);
            element.remove(); // Remove item from the tab
        } else {
            // Drop outside -> Reset to original position
            element.style.transform = originalTransform;
            originalParent.appendChild(element);
        }
    }
}

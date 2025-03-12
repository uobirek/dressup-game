
function makeDraggable(element, category, item) {
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;
    let originalParent = element.parentElement;
    let originalTransform = element.style.transform;

    element.style.transform = "translate3d(0px, 0px, 0px)";
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

        let character = document.getElementById("character");
        let charRect = character.getBoundingClientRect();
        let elemRect = element.getBoundingClientRect();

        let isInside =
            elemRect.left >= charRect.left &&
            elemRect.right <= charRect.right &&
            elemRect.top >= charRect.top &&
            elemRect.bottom <= charRect.bottom;

        if (isInside) {
            changeClothes(category, item);
            playSound('shiny-sound');
            resetTab(category);
            element.remove();
        } else {
            element.style.transform = originalTransform;
            originalParent.appendChild(element);
        }
    }
}

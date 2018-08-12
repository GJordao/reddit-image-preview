function throttle(func, wait = 100) {
    let timer = null;
    return function(...args) {
        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, wait);
        }
    };
}

// Unique ID for the className.
const MOUSE_VISITED_CLASSNAME = "crx_mouse_visited";

// Previous dom, that we want to track, so we can remove the previous styling.
var prevDOM = null;

function displayImageOnMouseMove(e) {
    const srcElement = e.srcElement;
    const parent = srcElement.parentElement;
    const role = srcElement.attributes.role;
    if (role && role.value === "img" && parent.attributes.href) {
        if (prevDOM != null) {
            prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
        }
        const img = document.createElement("img");
        img.classList.add(MOUSE_VISITED_CLASSNAME);
        img.id = "unique_image_preview";
        img.src = parent.attributes.href.value;
        document.body.appendChild(img);

        console.log(srcElement);
        console.log(img);
        prevDOM = srcElement;
    }
}

const throttledDisplayImageOnMouseMove = throttle(displayImageOnMouseMove, 500);

// Mouse listener for any move event on the current document.
document.addEventListener("mousemove", throttledDisplayImageOnMouseMove, false);

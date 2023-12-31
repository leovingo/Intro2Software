console.log("translate.js loaded", chrome);
const bodyDOM = document.querySelector("body");
function renderTooltipIcon() {
    const tooltipWrapper = document.createElement("div");
    tooltipWrapper.id = "translate-extension";
    const tooltipIcon = document.createElement("div");
    tooltipIcon.classList.add("translate-extension-icon");
    
    tooltipWrapper.appendChild(tooltipIcon);

    // Set the position to be fixed and adjust right to center it on the right side
    tooltipWrapper.style.position = 'fixed';
    tooltipWrapper.style.background = "blue";
    tooltipWrapper.style.padding = "10px";
    tooltipWrapper.style.top = "50%";
    tooltipWrapper.style.right = "0%";  // Adjusted to be 20% from the right side
    tooltipWrapper.style.transform = "translate(0, -50%)";  // Adjust for centering
    bodyDOM.appendChild(tooltipWrapper);
}

window.onload = () => {
    renderTooltipIcon();
};


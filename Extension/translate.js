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
    tooltipWrapper.addEventListener("click", () => {
        window.open("http://127.0.0.1:5500/Extension/popup/popup.html", "extension_popup", "width=500,height=500,status=no,scrollbars=yes,resizable=no");
    });
    // tooltipWrapper.addEventListener("click", () => {
    //     console.log("click")
    //     chrome.tabs.create({
    //         url: "http://127.0.0.1:5500/Extension/popup/popup.html",
    //         type: "popup",
    //         width: 500,
    //         height: 500,
    //         focused: true,
    //         // Nếu bạn muốn điều chỉnh các thuộc tính khác của cửa sổ, bạn có thể thêm chúng ở đây
    //     });
    // });
    bodyDOM.appendChild(tooltipWrapper);
}

window.onload = () => {
    renderTooltipIcon();
};

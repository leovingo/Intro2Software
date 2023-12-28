console.log("translate.js loaded", chrome);
const bodyDOM = document.querySelector("body");

function getSelectedText() {
    let selectedText = "";

    // window.getSelection
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    // document.getSelection for Firefox
    else if (document.getSelection) {
        selectedText = document.getSelection().toString();
    }
    // document.selection 
    else if (document.selection) {
        selectedText =
            document.selection.createRange().text;
    } else return "";
    return selectedText
}
function getSelectedTextNode() {
    let selectedText = "";

    // window.getSelection
    if (window.getSelection) {
        selectedText = window.getSelection();
    }
    // document.getSelection for Firefox
    else if (document.getSelection) {
        selectedText = document.getSelection();
    }
    // document.selection 
    else if (document.selection) {
        selectedText =
            document.selection.createRange();
    } else return "";
    return selectedText
}

function renderTooltipIcon(selectionTextRange) {
    const tooltipWrapper = document.createElement("div");
    tooltipWrapper.id = "translate-extension";
    const tooltipIcon = document.createElement("div");  
    tooltipIcon.classList.add("translate-extension-icon");
    tooltipIcon.style.backgroundImage = "url('icon.png')";
    tooltipWrapper.appendChild(tooltipIcon);
    
    const top  = selectionTextRange.top + selectionTextRange.height + 6 + "px";
    const left = selectionTextRange.left + ( selectionTextRange.width / 2 - tooltipWrapper.offsetWidth / 2) + "px";

    tooltipWrapper.style.position = 'absolute';
    tooltipWrapper.style.background = "blue";
    tooltipWrapper.style.padding = "10px";
    tooltipWrapper.style.top = top;
    tooltipWrapper.style.left = left;

    bodyDOM.appendChild(tooltipWrapper)
}

function getRangeSectionText(){
    const selectedTextNode = getSelectedTextNode();
        const getRange = selectedTextNode.getRangeAt(0);
        const selectionRect = getRange.getBoundingClientRect();
        return selectionRect;
}
bodyDOM.addEventListener("mouseup", () => {
    const selectedText = getSelectedText();
    if(selectedText && selectedText.length > 0){
        const selectionTextRange = getRangeSectionText();
        renderTooltipIcon(selectionTextRange);

        setTimeout(() => {
            const tooltipWrapper = document.querySelector("#translate-extension");
            if(tooltipWrapper) tooltipWrapper.remove();
        }, 3000);
    }
    
});


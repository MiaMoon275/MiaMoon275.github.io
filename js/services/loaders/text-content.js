function loadTextContent() {
    Object.entries(TEXT_CONTENT).forEach(([elementId, content]) => {
        container = document.getElementById(elementId);
        container.innerHTML = content;
    });
};

document.addEventListener("DOMContentLoaded", function () {
    const colorSelect = document.getElementById("crest-color");
    const crestImage = document.getElementById("custom-crest");
    const result = document.getElementById("crest-result");

    if (!colorSelect || !crestImage || !result) {
        return;
    }

    // Change the crest border when a house color is selected.
    colorSelect.addEventListener("change", function () {
        const selectedColor = colorSelect.value;
        const selectedName =
            colorSelect.options[colorSelect.selectedIndex].text;

        crestImage.style.borderColor = selectedColor;
        result.textContent = "Selected House Color: " + selectedName;
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const itemSelect = document.getElementById("banner-type");
    const quantityInput = document.getElementById("banner-quantity");
    const calculateButton = document.getElementById("calculate-price");
    const result = document.getElementById("price-result");

    if (!itemSelect || !quantityInput || !calculateButton || !result) {
        return;
    }

    // Calculate the estimated price based on item and quantity.
    calculateButton.addEventListener("click", function () {
        const price = Number(itemSelect.value);
        const quantity = Number(quantityInput.value);

        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
            result.textContent = "Please enter a quantity from 1 to 20.";
            return;
        }

        const total = price * quantity;

        result.textContent = "Estimated commission total: $" +
            total.toFixed(2);
    });
});
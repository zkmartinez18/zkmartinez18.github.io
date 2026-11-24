document.addEventListener("DOMContentLoaded", function () {
    const statusMessage = document.getElementById("workshop-status");

    if (!statusMessage) {
        return;
    }

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // Monday-Friday: 9 AM to 6 PM.
    const weekdayOpen = day >= 1 && day <= 5 &&
        hour >= 9 && hour < 18;

    // Saturday: 10 AM to 3 PM.
    const saturdayOpen = day === 6 &&
        hour >= 10 && hour < 15;

    const isOpen = weekdayOpen || saturdayOpen;

    if (isOpen) {
        statusMessage.textContent = "The workshop is currently open!";
    } else {
        statusMessage.textContent = "The workshop is currently closed!";
    }
});
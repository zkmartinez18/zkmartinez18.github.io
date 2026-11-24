document.addEventListener("DOMContentLoaded", async function () {
    const gallery = document.getElementById("galleryContainer");
    const loadingMessage = document.getElementById("loadingMessage");
    const studentCount = document.getElementById("studentCount");

    try {
        // Fetch all student introductions from the class API.
        const response = await fetch("https://intro-form.tommyhost.ing/");

        if (!response.ok) {
            throw new Error("Unable to retrieve introductions.");
        }

        const all = await response.json();

        // Convert the API object into an array of students.
        const students = Object.entries(all);
        const totalStudents = students.filter(function ([username, record]) {
            return record.introductionData;
        }).length;

        studentCount.textContent = `${totalStudents} classmate introduction loaded.`;

        loadingMessage.hidden = true;

        if (students.length === 0) {
            loadingMessage.textContent = "No introductions found.";
            loadingMessage.hidden = false;
            return;
        }

        // Create a card for each student.
        students.forEach(function ([username, record]) {
            const data = record.introductionData;

            if (!data) {
                return;
            }

            const card = document.createElement("article");
            card.className = "student-card";

            const heading = document.createElement("h4");
            const fullName = [
                data.firstName,
                data.lastName
            ].filter(Boolean).join(" ");

            heading.textContent = fullName || username;
            card.appendChild(heading);

            // Display the student's picture.
            if (data.img) {
                const picture = document.createElement("img");
                picture.src = data.img;
                picture.alt = data.pictureAlt || `Photo of ${fullName || username}`;
                picture.className = "student-picture";
                card.appendChild(picture);
            }

            // Display the student's mascot.
            const mascot = document.createElement("p");
            const mascotName = [
                data.adjectives,
                data.animal
            ].filter(Boolean).join(" ");

            mascot.textContent = `Mascot: ${mascotName || "Not provided"}`;
            card.appendChild(mascot);

            // Display the student's favorite quote.
            if (data.quote) {
                const quote = document.createElement("blockquote");
                quote.textContent = data.quote;
                card.appendChild(quote);

                if (data.quoteAuthor) {
                    const author = document.createElement("p");
                    author.textContent = `-${data.quoteAuthor}`;
                    card.appendChild(author);
                }
            }

            gallery.appendChild(card);
        });
    } catch (error) {
        loadingMessage.textContent =
            "Unable to load introductions. Please try again later.";
        loadingMessage.hidden = false;
        console.error("Introduction fetch failed", error);
    }
});
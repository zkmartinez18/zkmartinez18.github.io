document.addEventListener("DOMContentLoaded", function () {
    const coursesContainer = document.getElementById("coursesContainer");
    const addCourseButton = document.getElementById("addCourse");

    // Updates course headings after adding or removing courses.
    function updateCourseNumbers() {
        const courses = coursesContainer.querySelectorAll(".course-entry");

        courses.forEach(function (course, index) {
            course.querySelector("h4").textContent = `Course ${index + 1}`;
        });
    }

    // Adds a new course with empty fields.
    addCourseButton.addEventListener("click", function () {
        const newCourse = document.createElement("div");
        newCourse.className = "course-entry";

        newCourse.innerHTML = `
            <h4>New Course</h4>
            
            <label>Department:</label>
            <input type="text" name="department"
                   placeholder="Example: ITSC" required>
                    
            <label>Course Number:</label>
            <input type="text" name="courseNumber"
                   placeholder="Example: 3155" required>
                    
            <label>Course Title:</label>
            <input type="text" name="courseTitle"
                   placeholder="Enter course title" required>
                    
            <label>Reason for Taking:</label>
            <textarea name="reasonForTaking"
                      placeholder="Why are you taking this course?"
                      required></textarea>
                      
            <button type="button" class="removeCourse">
                Remove Course
            </button>
            `;

            coursesContainer.appendChild(newCourse);
            updateCourseNumbers();
    });

    // Removes a course when its Remove button is clicked.
    coursesContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("removeCourse")) {
            event.target.closest(".course-entry").remove();
            updateCourseNumbers();
        }
    });

    // Form controls
    const form = document.getElementById("form");
    const clearButton = document.getElementById("clearButton");

    // Hide previously generated code.
    function hideCode() {
        document.getElementById("codeOutput").hidden = true;
        document.getElementById("generatedCode").value = "";
    }

    // Save the original five courses for Reset.
    const originalCourses = coursesContainer.innerHTML;

    // Reset restores the original course list.
    form.addEventListener("reset", function (event) {
        event.preventDefault();

        // Restore the original five courses.
        coursesContainer.innerHTML = originalCourses;

        // Restore all fields to their original values.
        form.querySelectorAll("input, textarea, select").forEach(function (field) {
            if (field.type === "file") {
                field.value = "";
            } else {
                field.value = field.defaultValue;
            }
        });
        updateCourseNumbers();
        hideCode();
    });

    // Clear empties every field, including dynamically added courses.
    clearButton.addEventListener("click", function () {
        form.querySelectorAll("input, textarea, select").forEach(function (field) {
            field.value = "";
        });

    // Keep one empty course for the next visitor.
    const courses = coursesContainer.querySelectorAll(".course-entry");

    courses.forEach(function (course, index) {
        if (index > 0) {
            course.remove();
        }
    });

    updateCourseNumbers();
    hideCode();
    });

    // Prevent HTML entered by visitors from being interpreted as code.
    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            const replacements = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };
            return replacements[character];
        });
    }

    // Collect a field's value using its ID.
    function getValue(id) {
        return document.getElementById(id).value.trim();
    }

    // Collect form information for HTML, JSON, and XML output.
    function collectFormData() {
        const courses = Array.from(
            coursesContainer.querySelectorAll(".course-entry")
        ).map(function (course) {
            return {
                department: course.querySelector('[name="department"]').value.trim(),
                courseNumber: course.querySelector('[name="courseNumber"]').value.trim(),
                courseTitle: course.querySelector('[name="courseTitle"]').value.trim(),
                reasonForTaking: course.querySelector('[name="reasonForTaking"]').value.trim()
            };
        });

        return {
            firstName: getValue("firstName"),
            middleName: getValue("middleName"),
            nickname: getValue("nickName"),
            lastName: getValue("lastName"),
            acknowledgment: getValue("acknowledgment"),
            acknowledgmentDate: getValue("acknowledgmentDate"),
            prettyNameDivider: getValue("prettyNameDivider"),
            adjectives: getValue("adjectives"),
            animal: getValue("animal"),
            img: document.getElementById("img").files.length > 0
                ? "images/" + document.getElementById("img").files[0].name
                : "images/zack-introduction.jpg",
            pictureAlt: getValue("pictureAlt"),
            caption: getValue("caption"),
            personalInfo: {
                statement: getValue("statement"),
                personalBackground: getValue("personalBackground"),
                professionalBackground: getValue("professionalBackground"),
                academicBackground: getValue("academicBackground"),
                primaryWorkComputer: getValue("primaryWorkComputer"),
                primaryWorkLocation: getValue("primaryWorkLocation"),
                alternateComputerLocation: getValue("alternateComputerLocation")
            },
            courses: courses,
            quote: getValue("quote"),
            quoteAuthor: getValue("quoteAuthor"),
            funnyItem: getValue("funnyItem"),
            somethingToShare: getValue("somethingToShare"),
            footerLinks: [
                {label: "CLT Web", url: getValue("cltWeb") },
                {label: "GitHub.io", url: getValue("githubIo") },
                {label: "GitHub", url: getValue("github") },
                {label: "freeCodeCamp", url: getValue("freeCodeCamp") },
                {label: "Codecademy", url: getValue("codecademy") },
                {label: "LinkedIn", url: getValue("linkedIn") }
            ]
        };
    }

    // Generate the introduction when Submit is clicked.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const result = document.getElementById("introductionResult");

        // Collect the visitor's name and mascot information.
        const firstName = getValue("firstName");
        const middleName = getValue("middleName");
        const nickname = getValue("nickName");
        const lastName = getValue("lastName");
        const adjective = getValue("adjectives");
        const animal = getValue("animal");
        const divider = getValue("prettyNameDivider");

        const fullName = [firstName, middleName, lastName]
            .filter(Boolean).join(" ");

        const displayName = nickname
            ? `${firstName} "${nickname}" ${lastName}`
            : fullName;

        // Collect all courses, including newly added courses.
        const courses = Array.from(
            coursesContainer.querySelectorAll(".course-entry")
        ).map(function (course) {
            return {
                department: course.querySelector(
                    '[name="department"]').value.trim(),
                courseNumber: course.querySelector(
                    '[name="courseNumber"]').value.trim(),
                courseTitle: course.querySelector(
                    '[name="courseTitle"]').value.trim(),
                reasonForTaking: course.querySelector(
                    '[name="reasonForTaking"]').value.trim()               
            };
        });

        const courseHTML = courses.map(function (course) {
            return `
            <li>
                <strong>${escapeHTML(course.department)}
                ${escapeHTML(course.courseNumber)} -
                ${escapeHTML(course.courseTitle)}:</strong>
                ${escapeHTML(course.reasonForTaking)}
            </li>
            `;
        }).join("");

        // Use the uploaded image, or the original image by default.
        const uploadedImage = document.getElementById("img").files[0];
        const imageSource = uploadedImage
            ? URL.createObjectURL(uploadedImage)
            : "images/zack-introduction.jpg";

        // Generate the introduction using the original page structure.
        result.innerHTML = `
            <h6>${escapeHTML(displayName)}
            ${escapeHTML(divider)}
            ${escapeHTML(adjective)} ${escapeHTML(animal)}</h6>
            
            <figure>
                <img src="${imageSource}"
                    alt="${escapeHTML(getValue("pictureAlt"))}">
                <figcaption>
                    <em>${escapeHTML(getValue("caption"))}</em>
                </figcaption>
            </figure>
            
            <p>${escapeHTML(getValue("statement"))}</p>
            
            <ul>
                <li><strong>Personal Background:</strong>
                    ${escapeHTML(getValue("personalBackground"))}</li>

                <li><strong>Professional Background:</strong>
                    ${escapeHTML(getValue("professionalBackground"))}</li>
                    
                <li><strong>Academic Background:</strong>
                    ${escapeHTML(getValue("academicBackground"))}</li>

                <li><strong>Primary Work Computer:</strong>
                    ${escapeHTML(getValue("primaryWorkComputer"))}</li>

                <li><strong>Primary Work Location:</strong>
                    ${escapeHTML(getValue("primaryWorkLocation"))}</li>

                <li><strong>Alternate Computer &amp; Location:</strong>
                    ${escapeHTML(getValue("alternateComputerLocation"))}</li>

                <li>
                    <strong>Courses I'm Taking, &amp; Why:</strong>
                    <ol>${courseHTML}</ol>
                </li>
            </ul>

            <blockquote>
                <p>"${escapeHTML(getValue("quote"))}"</p>
                <cite>~ ${escapeHTML(getValue("quoteAuthor"))}</cite>
            </blockquote>

            ${getValue("funnyItem") ? `
                <p><strong>Funny Thing About Yourself:</strong>
                    ${escapeHTML(getValue("funnyItem"))}</p>
            ` : ""}

            ${getValue("somethingToShare") ? `
                <p><strong>Something I Would Like To Share:</strong>
                    ${escapeHTML(getValue("somethingToShare"))}</p>
            ` : ""}

        <p class="introduction-links">
            <a href="${escapeHTML(getValue("cltWeb"))}">CLT Web</a> |
            <a href="${escapeHTML(getValue("githubIo"))}">GitHub.io</a> |
            <a href="${escapeHTML(getValue("github"))}">GitHub</a> |
            <a href="${escapeHTML(getValue("freeCodeCamp"))}">freeCodeCamp</a> |
            <a href="${escapeHTML(getValue("codecademy"))}">Codecademy</a> |
            <a href="${escapeHTML(getValue("linkedIn"))}">LinkedIn</a>
        </p>
            `;

            // Hide the form and its instruction heading.
            form.hidden = true;
            document.querySelector("main h3").hidden = true;

            // Display the completed introduction.
            result.hidden  = false;
            document.getElementById("returnButton").hidden = false;

            // Update the heading to match the generated introduction.
            document.querySelector("main h2").textContent = "Introduction";
    });

    // Return to the form without losing entered information.
    document.getElementById("returnButton").addEventListener("click", function () {
        form.hidden = false;

        document.querySelector("main h3").hidden = false;
        document.querySelector("main h2").textContent = "Introduction Form";

        document.getElementById("introductionResult").hidden = true;
        this.hidden = true;
    });

    // Display generated code inside the textarea.
    function showCode(code, format) {
        const output = document.getElementById("codeOutput");
        const generatedCode = document.getElementById("generatedCode");

        generatedCode.value = code;

        output.querySelector("h3").textContent = `Generated ${format}`;
        output.hidden = false;
    }

    // Generate JSON from the form information.
    document.getElementById("jsonButton").addEventListener("click", function () {
        if (!form.reportValidity()) {
            return;
        }

        const data = collectFormData();
        showCode(JSON.stringify(data, null, 4), "JSON");
    });

    // Generate XML from the form information.
    document.getElementById("xmlButton").addEventListener("click", function () {
        if (!form.reportValidity()) {
            return;
        }

        const data =collectFormData();

        function escapeXML(value) {
            return escapeHTML(value);
        }

        function toXML(key, value) {
            if (Array.isArray(value)) {
                const itemName = key === "courses" ? "course" : "link";
                return `<${key}>\n` +
                    value.map(function (item) {
                        return toXML(itemName, item);
                    }).join("\n") +
                        `\n</${key}>`;
            }

            if (value != null && typeof value === "object") {
                return `<${key}>\n` +
                    Object.entries(value).map(function ([childKey, childValue]) {
                        return toXML(childKey, childValue);
                    }).join("\n") +
                    `\n</${key}>`;
            }

            return `<${key}>${escapeXML(value)}</${key}>`;
        }

        const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
            toXML("introduction", data);

        showCode(xml, "XML");
    });

    // Generate HTML from the form introduction.
    document.getElementById("htmlButton").addEventListener("click", function () {
        if (!form.reportValidity()) {
            return;
        }

        const data = collectFormData();

        const fullName = [
            data.firstName,
            data.middleName,
            data.lastName
        ].filter(Boolean).join(" ");

        const displayName = data.nickname
            ? `${data.firstName} "${data.nickname}" ${data.lastName}`
            : fullName;

        const courseHTML = data.courses.map(function (course) {
            return `
            <li>
                <strong>${escapeHTML(course.department)}
                ${escapeHTML(course.courseNumber)} -
                ${escapeHTML(course.courseTitle)}:</strong>
                ${escapeHTML(course.reasonForTaking)}
            </li>`;
        }).join("");

        const linksHTML = data.footerLinks.map(function (link) {
            return `<a href="${escapeHTML(link.url)}">${escapeHTML(link.label)}</a>`;
        }).join(" | ");

        const imageSource = data.img;

        const html = `
    <section class="introduction">
        <h2>Introduction</h2>
        
        <h3>${escapeHTML(displayName)}
            ${escapeHTML(data.prettyNameDivider)}
            ${escapeHTML(data.adjectives)}
            ${escapeHTML(data.animal)}
       </h3>
       
       <figure>
            <img src="${escapeHTML(imageSource)}"
                alt="${escapeHTML(data.pictureAlt)}">
            <figcaption>
                <em>${escapeHTML(data.caption)}</em>
            </figcaption>
        </figure>
        
        <p>${escapeHTML(data.personalInfo.statement)}</p>
        
        <ul>
            <li><strong>Personal Background:</strong>
                ${escapeHTML(data.personalInfo.personalBackground)}</li>
                
            <li><strong>Professional Background:</strong>
                ${escapeHTML(data.personalInfo.professionalBackground)}</li>
                
            <li><strong>Academic Background:</strong>
                ${escapeHTML(data.personalInfo.academicBackground)}</li>
                
            <li><strong>Primary Work Computer:</strong>
                ${escapeHTML(data.personalInfo.primaryWorkComputer)}</li>
                
            <li><strong>Primary Work Location:</strong>
                ${escapeHTML(data.personalInfo.primaryWorkLocation)}</li>
                
            <li><strong>Alternate Computer &amp; Location:</strong>
                ${escapeHTML(data.personalInfo.alternateComputerLocation)}</li>
                
            <li>
                <strong>Courses I'm Taking &amp; Why:</strong>
                <ol>${courseHTML}</ol>
            </li>
        </ul>
        
        <blockquote>
            <p>"${escapeHTML(data.quote)}"</p>
            <cite>~ ${escapeHTML(data.quoteAuthor)}</cite>
        </blockquote>
        
        ${data.funnyItem ? `
        <p><strong>Funny Thing About Yourself:</strong>
            ${escapeHTML(data.funnyItem)}</p>` : ""}
            
        ${data.somethingToShare ? `
            <p><strong>Something I Would Like To Share:</strong>
                ${escapeHTML(data.somethingToShare)}</p>` : ""}
                
            <p class="introduction-links">
                ${linksHTML}
            </p>
        </section>`.trim();

            showCode(html, "HTML");
    });
});
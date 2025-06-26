let skills = [];

function addSkill() {
    const nameInput = document.getElementById("skillName");
    const progressInput = document.getElementById("skillProgress");

    const name = nameInput.value.trim();
    const progress = parseInt(progressInput.value.trim());

    // Clear previous error styles
    nameInput.style.border = "";
    progressInput.style.border = "";

    // Validation
    if (!name) {
        nameInput.style.border = "2px solid red";
        alert("Please enter a skill name.");
        return;
    }

    if (isNaN(progress) || progress < 0 || progress > 100) {
        progressInput.style.border = "2px solid red";
        alert("Progress must be a number between 0 and 100.");
        return;
    }

    if (skills.some(skill => skill.name.toLowerCase() === name.toLowerCase())) {
        nameInput.style.border = "2px solid red";
        alert("Skill already exists.");
        return;
    }

    // Add skill if valid
    skills.push({ name, progress });
    updateList();
    nameInput.value = '';
    progressInput.value = '';
}

function updateList() {
    const list = document.getElementById("skillList");
    list.innerHTML = '';

    skills.forEach((skill, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="skill-header">
                <strong>${skill.name}</strong> – ${skill.progress}%
            </div>
            <div class="bar">
                <div class="fill" style="width: ${skill.progress}%"></div>
            </div>
            <div class="buttons">
                <button onclick="editSkill(${index})">✏️ Edit</button>
                <button onclick="deleteSkill(${index})">🗑️ Delete</button>
            </div>
        `;

        list.appendChild(li);
    });
}



function saveSkills() {
    localStorage.setItem("skills", JSON.stringify(skills));
    alert("Skills saved locally!");
}

function loadSkills() {
    const data = localStorage.getItem("skills");
    if (data) {
        skills = JSON.parse(data);
        updateList();
    } else {
        alert("No saved skills found.");
    }
}

function editSkill(index) {
    const newProgress = prompt(`Enter new progress for ${skills[index].name}:`, skills[index].progress);

    if (newProgress === null) return; // cancelled

    const value = parseInt(newProgress);

    if (isNaN(value) || value < 0 || value > 100) {
        alert("Progress must be a number between 0 and 100.");
        return;
    }

    skills[index].progress = value;
    updateList();
}

function deleteSkill(index) {
    if (confirm(`Delete "${skills[index].name}"?`)) {
        skills.splice(index, 1);
        updateList();
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    document.getElementById("themeToggle").textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Load theme on page load
window.onload = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("themeToggle").textContent = "☀️ Light Mode";
    } else {
        document.getElementById("themeToggle").textContent = "🌙 Dark Mode";
    }
};

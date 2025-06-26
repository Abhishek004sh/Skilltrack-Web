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
        li.textContent = `${skill.name} – ${skill.progress}%`;
        li.onclick = () => {
            if (confirm("Delete this skill?")) {
                skills.splice(index, 1);
                updateList();
            }
        };
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

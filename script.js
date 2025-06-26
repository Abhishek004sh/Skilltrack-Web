let skills = [];

function addSkill() {
    const name = document.getElementById("skillName").value.trim();
    const progress = parseInt(document.getElementById("skillProgress").value.trim());

    if (!name || isNaN(progress) || progress < 0 || progress > 100) {
        alert("Enter valid name and progress between 0-100.");
        return;
    }

    skills.push({ name, progress });
    updateList();
    document.getElementById("skillName").value = '';
    document.getElementById("skillProgress").value = '';
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

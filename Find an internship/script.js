document
  .getElementById("matchingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const userType = document.getElementById("userType").value;
    const studentPreferences = {
      foodAllowance: document.getElementById("foodAllowance")
        ? document.getElementById("foodAllowance").checked
        : false,
      skills: [
        document.getElementById("reactSkills") &&
          document.getElementById("reactSkills").checked &&
          "ReactJS",
        document.getElementById("htmlSkills") &&
          document.getElementById("htmlSkills").checked &&
          "HTML",
        document.getElementById("cssSkills") &&
          document.getElementById("cssSkills").checked &&
          "CSS",
      ].filter(Boolean),
    };

    const employerPreferences = {
      foodAllowanceRequired: document.getElementById("foodAllowanceRequired")
        ? document.getElementById("foodAllowanceRequired").checked
        : false,
      skills: [
        document.getElementById("reactSkillsRequired") &&
          document.getElementById("reactSkillsRequired").checked &&
          "ReactJS",
        document.getElementById("htmlSkillsRequired") &&
          document.getElementById("htmlSkillsRequired").checked &&
          "HTML",
        document.getElementById("cssSkillsRequired") &&
          document.getElementById("cssSkillsRequired").checked &&
          "CSS",
      ].filter(Boolean),
    };

    findMatches(userType, studentPreferences, employerPreferences)
      .then((matches) => {
        displayMatches(matches);
      })
      .catch((error) => {
        console.error("Error finding matches:", error);
      });
  });

function findMatches(userType, studentPreferences, employerPreferences) {
  return new Promise((resolve, reject) => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // ให้ดูข้อมูลที่ได้รับมาในคอนโซล
        if (userType === "student") {
          const matches = data.employers
            .filter((employer) => {
              return (
                (!employerPreferences.foodAllowanceRequired ||
                  employer.foodAllowance) &&
                studentPreferences.skills.every((skill) =>
                  employer.requirements.includes(skill)
                )
              );
            })
            .map((employer) => {
              return { type: "employer", ...employer };
            });
          resolve(matches);
        } else if (userType === "employer") {
          const matches = data.students
            .filter((student) => {
              return (
                (!studentPreferences.foodAllowance || student.foodAllowance) &&
                employerPreferences.skills.every((skill) =>
                  student.skills.includes(skill)
                )
              );
            })
            .map((student) => {
              return { type: "student", ...student };
            });
          resolve(matches);
        } else {
          reject("Invalid user type");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function displayMatches(matches) {
  const matchesContainer = document.getElementById("matches");
  matchesContainer.innerHTML = "";

  if (matches.length === 0) {
    matchesContainer.innerHTML = "<p>No matches found.</p>";
    return;
  }

  matches.forEach((match) => {
    const matchContainer = document.createElement("div");
    matchContainer.classList.add("match");

    const image = document.createElement("img");
    image.src = match.image;
    image.alt = match.name;
    matchContainer.appendChild(image);

    const details = document.createElement("div");
    details.classList.add("details");
    matchContainer.appendChild(details);

    const name = document.createElement("p");
    name.textContent = `Name: ${match.name}`;
    details.appendChild(name);

    const contact = document.createElement("p");
    contact.textContent = `Contact: ${match.contact}`;
    details.appendChild(contact);

    if (match.type === "student") {
      const age = document.createElement("p");
      age.textContent = `Age: ${match.age}`;
      details.appendChild(age);

      const skills = document.createElement("p");
      skills.textContent = `Skills: ${match.skills.join(", ")}`;
      details.appendChild(skills);
    } else if (match.type === "employer") {
      const address = document.createElement("p");
      address.textContent = `Address: ${match.address}`;
      details.appendChild(address);

      const foodAllowance = document.createElement("p");
      foodAllowance.textContent = `Food Allowance: ${
        match.foodAllowance ? "Yes" : "No"
      }`;
      details.appendChild(foodAllowance);

      const requirements = document.createElement("p");
      requirements.textContent = `Requirements: ${match.requirements.join(
        ", "
      )}`;
      details.appendChild(requirements);
    }

    matchesContainer.appendChild(matchContainer);
  });
}

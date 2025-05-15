let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

function getAge(dobString) {
  const today = new Date();
  const dob = new Date(dobString);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function isEmailValid(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function displayEntries() {
  const table = document.createElement("table");
  table.classList.add("table-auto", "w-full", "border-collapse", "border");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th class="border px-4 py-2">Name</th>
      <th class="border px-4 py-2">Email</th>
      <th class="border px-4 py-2">Password</th>
      <th class="border px-4 py-2">Dob</th>
      <th class="border px-4 py-2">Accepted terms?</th>
    </tr>`;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  userEntries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border px-4 py-2">${entry.name}</td>
      <td class="border px-4 py-2">${entry.email}</td>
      <td class="border px-4 py-2">${entry.password}</td>
      <td class="border px-4 py-2">${entry.dob}</td>
      <td class="border px-4 py-2">${entry.acceptedTerms}</td>`;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  const userEntriesDiv = document.getElementById("user-entries");
  userEntriesDiv.innerHTML = "";
  userEntriesDiv.appendChild(table);
}

function saveUser(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  const age = getAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  if (!isEmailValid(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTerms,
  };

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
  document.getElementById("user_form").reset();
}

document.getElementById("user_form").addEventListener("submit", saveUser);

displayEntries(); 

let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

// Utility to calculate age from dob string (yyyy-mm-dd)
function getAge(dobString) {
  const today = new Date();
  const dob = new Date(dobString);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

// Simple email format validation
function isEmailValid(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function displayEntries() {
  if (userEntries.length === 0) {
    document.getElementById("user-entries").innerHTML = "<p>No entries yet.</p>";
    return;
  }

  let rows = userEntries
    .map(
      (entry) => `
      <tr>
        <td class='border px-4 py-2'>${entry.name}</td>
        <td class='border px-4 py-2'>${entry.email}</td>
        <td class='border px-4 py-2'>${entry.password}</td>
        <td class='border px-4 py-2'>${entry.dob}</td>
        <td class='border px-4 py-2'>${entry.acceptTermsAndConditions}</td>
      </tr>`
    )
    .join("");

  const table = `
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 border border-gray-300">Name</th>
          <th class="px-4 py-2 border border-gray-300">Email</th>
          <th class="px-4 py-2 border border-gray-300">Password</th>
          <th class="px-4 py-2 border border-gray-300">Dob</th>
          <th class="px-4 py-2 border border-gray-300">Accepted terms?</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;

  document.getElementById("user-entries").innerHTML = table;
}

function saveUserForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions = document.getElementById("acceptTerms").checked;

  if (!isEmailValid(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!dob) {
    alert("Please select your date of birth.");
    return;
  }

  const age = getAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const newUser = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };

  userEntries.push(newUser);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();

  document.getElementById("user_form").reset();
}

document.getElementById("user_form").addEventListener("submit", saveUserForm);

displayEntries();

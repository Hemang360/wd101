const dobInput = document.getElementById("dob");
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

const maxDob = `${yyyy - 18}-${mm}-${dd}`;
const minDob = `${yyyy - 55}-${mm}-${dd}`;

dobInput.max = maxDob;
dobInput.min = minDob;

let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

function displayEntries() {
  const savedEntries = JSON.parse(localStorage.getItem("user-entries")) || [];
  const entriesHTML = savedEntries
    .map((entry) => {
      return `
        <tr>
          <td class="border px-4 py-2">${entry.name}</td>
          <td class="border px-4 py-2">${entry.email}</td>
          <td class="border px-4 py-2">${entry.password}</td>
          <td class="border px-4 py-2">${entry.dob}</td>
          <td class="border px-4 py-2">${entry.acceptTermsAndConditions}</td>
        </tr>`;
    })
    .join("");

  const table = `
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Password</th>
          <th class="px-4 py-2">Dob</th>
          <th class="px-4 py-2">Accepted terms?</th>
        </tr>
      </thead>
      <tbody>${entriesHTML}</tbody>
    </table>`;

  document.getElementById("user-entries").innerHTML = table;
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getAge(dob) {
  const birthDate = new Date(dob);
  const ageDiffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function saveUserForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions = document.getElementById("acceptTerms").checked;

  if (!isEmailValid(email)) {
    alert("Invalid email format!");
    return;
  }

  const age = getAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
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
}

document.getElementById("user_form").addEventListener("submit", saveUserForm);
window.addEventListener("DOMContentLoaded", displayEntries);

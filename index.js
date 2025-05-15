(function () {
  const form = document.getElementById("survey-form");
  const entriesContainer = document.getElementById("entryDisplay");
  const dobInput = document.getElementById("birthDate");

  // Set age limits: between 18 and 55
  const setDateLimits = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const maxDate = `${year - 18}-${month}-${day}`;
    const minDate = `${year - 55}-${month}-${day}`;

    dobInput.setAttribute("max", maxDate);
    dobInput.setAttribute("min", minDate);
  };

  const getStoredEntries = () => {
    const stored = localStorage.getItem("entries-list");
    return stored ? JSON.parse(stored) : [];
  };

  const saveEntry = (entry) => {
    const entries = getStoredEntries();
    entries.push(entry);
    localStorage.setItem("entries-list", JSON.stringify(entries));
  };

  const renderEntries = () => {
    const entries = getStoredEntries();

    if (entries.length === 0) {
      entriesContainer.innerHTML = `<p class="text-center text-gray-500">No entries yet.</p>`;
      return;
    }

    const rows = entries.map((entry) => `
      <tr class="text-center">
        <td class="border px-4 py-2">${entry.fullName}</td>
        <td class="border px-4 py-2">${entry.email}</td>
        <td class="border px-4 py-2">${entry.password}</td>
        <td class="border px-4 py-2">${entry.birthDate}</td>
        <td class="border px-4 py-2">${entry.termsAccepted ? "Yes" : "No"}</td>
      </tr>
    `).join('');

    entriesContainer.innerHTML = `
      <table class="table-auto w-full border border-gray-300 mt-4">
        <thead>
          <tr class="bg-gray-200 text-center">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Password</th>
            <th class="border px-4 py-2">DOB</th>
            <th class="border px-4 py-2">Accepted Terms?</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newEntry = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("userEmail").value,
      password: document.getElementById("userPassword").value,
      birthDate: document.getElementById("birthDate").value,
      termsAccepted: document.getElementById("termsCheck").checked
    };

    saveEntry(newEntry);
    renderEntries();
    form.reset();
  });

  setDateLimits();
  renderEntries();
})();

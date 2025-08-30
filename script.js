// Saglabā un lasa ierakstus no localStorage
function getEntries() {
  return JSON.parse(localStorage.getItem("entries") || "[]");
}

function saveEntries(entries) {
  localStorage.setItem("entries", JSON.stringify(entries));
}

// Pievienot jaunu ierakstu
function submitEntry() {
  const text = document.getElementById("inputText").value;
  if (!text) return alert("Ievadi tekstu!");

  let entries = getEntries();
  entries.push({ id: Date.now(), text });
  saveEntries(entries);

  document.getElementById("inputText").value = "";
  alert("Ieraksts pievienots!");
}

// Ielādēt ierakstus tabulā
function loadEntries() {
  let entries = getEntries();
  const tbody = document.getElementById("entriesTable");
  tbody.innerHTML = "";

  entries.forEach(entry => {
    const tr = document.createElement("tr");

    const tdText = document.createElement("td");
    tdText.textContent = entry.text;

    const tdAction = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "Dzēst";
    btn.onclick = () => deleteEntry(entry.id);

    tdAction.appendChild(btn);
    tr.appendChild(tdText);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });
}

// Dzēst ierakstu
function deleteEntry(id) {
  let entries = getEntries();
  entries = entries.filter(e => e.id !== id);
  saveEntries(entries);
  loadEntries();
}

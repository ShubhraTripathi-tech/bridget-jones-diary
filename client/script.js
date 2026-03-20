const API_URL = "http://localhost:5000/api/diaries";

let editingId = null;

// Load entries
async function loadEntries() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderEntries(data);
}

// Render entries
function renderEntries(entries) {
  const list = document.getElementById("entriesList");
  list.innerHTML = "";

  entries.forEach((entry) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.content}</p>
      <small>${entry.category} | ${entry.created_at}</small>

      <div class="actions">
        <button onclick="startEdit(${entry.id}, '${entry.content}')">Edit</button>
        <button onclick="deleteEntry(${entry.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// CREATE / UPDATE handler
document.getElementById("entryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const entry = {
    title: document.getElementById("title").value,
    content: document.getElementById("content").value,
    category: document.getElementById("category").value,
    created_at: document.getElementById("created_at").value,
  };

  if (editingId) {
    // UPDATE
    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: entry.content }),
    });

    editingId = null;
  } else {
    // CREATE
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
  }

  e.target.reset();
  loadEntries();
});

// Delete
async function deleteEntry(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  loadEntries();
}

// Start editing
function startEdit(id, content) {
  editingId = id;

  document.getElementById("content").value = content;

  alert("Editing mode enabled. Update the content and submit.");
}

// Search
async function searchEntries() {
  const category = document.getElementById("searchCategory").value;
  const year = document.getElementById("searchYear").value;
  const month = document.getElementById("searchMonth").value;

  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (year) params.append("year", year);
  if (month) params.append("month", month);

  const res = await fetch(`${API_URL}/search?${params}`);
  const data = await res.json();

  renderEntries(data);
}

// Initial load
loadEntries();

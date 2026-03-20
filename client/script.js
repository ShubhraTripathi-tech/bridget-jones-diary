const API_URL = "http://localhost:5000/api/diaries";

let editingId = null;
let expandedId = null;

// Load entries and render to page
async function loadEntries() {
  const res = await fetch(API_URL);
  const entries = await res.json();

  const list = document.getElementById("entriesList");
  list.innerHTML = "";

  entries.forEach((e) => {
    const isExpanded = expandedId === e.id;

    list.innerHTML += `
      <li>
        <!-- TITLE (click to expand) -->
        <h3 onclick="toggleDetails(${e.id})" style="cursor:pointer;">
          ${e.title}
        </h3>

        <!-- DETAILS (only show if clicked) -->
        ${
          isExpanded
            ? `
          <p>${e.content}</p>
          <small>${e.category} | ${e.created_at}</small><br>

          <button onclick="editEntry(${e.id}, \`${e.title}\`, \`${e.content}\`, \`${e.category}\`)">
            Edit
          </button>
          <button onclick="deleteEntry(${e.id})">Delete</button>
        `
            : ""
        }
      </li>
    `;
  });
}

// Toggle details view
function toggleDetails(id) {
  expandedId = expandedId === id ? null : id;
  loadEntries();
}

// Create / Update form submission
document.getElementById("entryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const entry = {
    title: document.getElementById("title").value,
    content: document.getElementById("content").value,
    category: document.getElementById("category").value,
    created_at: document.getElementById("created_at").value,
  };

  if (editingId) {
    await fetch(`${API_URL}/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });

    editingId = null;
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
  }

  e.target.reset();
  loadEntries();
});

// Delete function
async function deleteEntry(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadEntries();
}

// Edit → fills form with existing data and scrolls to top
function editEntry(id, title, content, category) {
  editingId = id;

  document.getElementById("title").value = title;
  document.getElementById("content").value = content;
  document.getElementById("category").value = category;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Initial load
loadEntries();

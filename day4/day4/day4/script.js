// ===== Select all elements =====
const textarea = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

const DRAFT_KEY = "draft";
const THEME_KEY = "theme";

// ===== Update both counters and the warning classes =====
function updateCounts() {
  const text = textarea.value;
  const chars = text.length;
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;

  charCount.textContent = chars + " / 200 characters";
  wordCount.textContent = words + " words";

  charCount.classList.toggle("warning", chars > 180);
  charCount.classList.toggle("over", chars > 200);
}

// ===== Clear everything =====
function clearNote() {
  textarea.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
}

// ===== Theme =====
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

// ===== Events =====
textarea.addEventListener("input", function () {
  updateCounts();
  localStorage.setItem(DRAFT_KEY, textarea.value);
});

clearBtn.addEventListener("click", clearNote);

textarea.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearNote();
  }
});

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
});

// ===== On page load: restore draft and theme =====
const savedDraft = localStorage.getItem(DRAFT_KEY);
if (savedDraft !== null) {
  textarea.value = savedDraft;
}

applyTheme(localStorage.getItem(THEME_KEY) === "dark");
updateCounts();

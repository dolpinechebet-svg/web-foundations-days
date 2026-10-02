// ===== Starting data =====
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// ===== 1. searchNotes(word) =====
function searchNotes(word) {
  const search = word.toLowerCase();
  return notes.filter(function (note) {
    return note.text.toLowerCase().includes(search);
  });
}

// ===== 2. longestNote() =====
function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

// ===== 3. countByCategory() =====
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    if (counts[note.category] === undefined) {
      counts[note.category] = 1;
    } else {
      counts[note.category]++;
    }
  }
  return counts;
}

// ===== 4. getSummary() =====
function getSummary() {
  const counts = countByCategory();
  const personal = counts.personal || 0;
  const work = counts.work || 0;
  const study = counts.study || 0;
  const word = notes.length === 1 ? "note" : "notes";
  return `${notes.length} ${word}: ${personal} personal, ${work} work, ${study} study.`;
}

// ===== 5. isDuplicate(text) =====
function cleanText(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function isDuplicate(text) {
  const cleaned = cleanText(text);
  return notes.some(function (note) {
    return cleanText(note.text) === cleaned;
  });
}

// ===== 6. addNote(text, category) =====
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  const trimmed = typeof text === "string" ? text.trim() : "";

  if (trimmed.length < 1 || trimmed.length > 200) {
    console.log("Not added: text must be 1 to 200 characters.");
    return false;
  }
  if (isDuplicate(trimmed)) {
    console.log("Not added: this note already exists.");
    return false;
  }
  if (!validCategories.includes(category)) {
    console.log("Not added: category must be personal, work or study.");
    return false;
  }

  let newId = 1;
  if (notes.length > 0) {
    newId = Math.max(...notes.map(function (n) { return n.id; })) + 1;
  }
  notes.push({ id: newId, text: trimmed, category: category });
  return true;
}

// ===== TESTS =====

// --- searchNotes ---
console.log(searchNotes("milk"));
// Expected: [ { id: 1, text: "Buy milk and bread", category: "personal" } ]
console.log(searchNotes("THE"));
// Expected: notes 2 and 3 (case is ignored)
console.log(searchNotes("xyz"));
// Expected: [] (no results)

// --- longestNote ---
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }
const savedNotes = notes;
notes = [];
console.log(longestNote());
// Expected: null (empty array)
notes = savedNotes;

// --- countByCategory ---
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }
notes = [];
console.log(countByCategory());
// Expected: {} (empty object)
notes = savedNotes;

// --- getSummary ---
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."
notes = [{ id: 1, text: "Only note", category: "work" }];
console.log(getSummary());
// Expected: "1 note: 0 personal, 1 work, 0 study."
notes = savedNotes;

// --- isDuplicate ---
console.log(isDuplicate("buy milk and bread"));
// Expected: true (ignores case)
console.log(isDuplicate("  CALL    mum  "));
// Expected: true (ignores case and extra spaces)
console.log(isDuplicate("Walk the dog"));
// Expected: false

// --- addNote ---
console.log(addNote("Pay the rent", "personal"));
// Expected: true
console.log(addNote("  buy MILK and   bread ", "personal"));
// Expected: logs "Not added: this note already exists." then false
console.log(addNote("   ", "work"));
// Expected: logs "Not added: text must be 1 to 200 characters." then false
console.log(addNote("a".repeat(201), "work"));
// Expected: logs "Not added: text must be 1 to 200 characters." then false
console.log(addNote("Go dancing", "fun"));
// Expected: logs "Not added: category must be personal, work or study." then false

// --- Check the result after adding ---
console.log(getSummary());
// Expected: "6 notes: 3 personal, 1 work, 2 study."
console.log(notes.length);
// Expected: 6

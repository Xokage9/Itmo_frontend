let noteID = 1;
let count = 0;
let first = true;

const sanitizeNote = (note) => {
  return note.replace(/ {2,}/g, ' ').replace(/\n/g, ' ').trim();
};

const escapeHTML = (str) =>
  str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

const getNextIdFromStorage = () => {
  let max = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    const m = /^note-(\d+)$/.exec(k);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max + 1;
};

const updateNoteContent = (elOrEvent) => {
  const el = elOrEvent?.target ? elOrEvent.target : elOrEvent;
  const key = el.dataset.key;
  const value = sanitizeNote(el.innerText);
  localStorage.setItem(key, value);
};

const removeNote = (id) => {
  const button = document.getElementById(id);
  const div = button.parentNode;
  const p = div.querySelector('p');
  const key = p.dataset.key;

  div.parentNode.removeChild(div);

  if (key) localStorage.removeItem(key);

  count--;
  if (count == 0 && !first) {
    const form = document.getElementById('note-form');
    const deleteAllButton = document.getElementById('delete-all');
    if (deleteAllButton) form.removeChild(deleteAllButton);
    first = true;
  }
};

const deleteAll = () => {
  const container = document.getElementById('notes-container');
  container.innerHTML = '';
  count = 0;
  localStorage.clear();
  if (!first) {
    const form = document.getElementById('note-form');
    const deleteAllButton = document.getElementById('delete-all');
    if (deleteAllButton) form.removeChild(deleteAllButton);
    first = true;
  }
  noteID = 1;
};

const createNote = (text, key = null) => {
  const container = document.getElementById('notes-container');
  if (!text) return;


  if (!key) key = `note-${noteID}`;


  const safeText = escapeHTML(text);

  const template = `
    <div id="note-${noteID}" class="added">
      <p
        id="note-content-${noteID}"
        data-key="${key}"
        contenteditable="plaintext-only"
        oninput="updateNoteContent(this)"
        onblur="updateNoteContent(this)"
      >${safeText}</p>
      <button id="button-${noteID}" onclick="removeNote(this.id)">🗑️</button>
    </div>
  `;


  container.innerHTML = template + container.innerHTML;

  document.getElementById('note-input').value = '';

  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, sanitizeNote(text));
  }

  noteID++;
  count++;

  if (first) {
    const form = document.getElementById('note-form');
    const deleteAllButton = `
      <button id="delete-all" onclick="deleteAll()">Удалить все</button>
    `;
    form.innerHTML += deleteAllButton;
    first = false;
  }
};

const saveToLocalStorage = () => {
  const text = document.getElementById('note-input').value;
  createNote(text);
};

const createNotesFromLocalStorage = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (/^note-\d+$/.test(k)) keys.push(k);
  }
  keys.sort((a, b) => parseInt(b.split('-')[1]) - parseInt(a.split('-')[1])); 

  keys.forEach((key) => {
    const note = localStorage.getItem(key);
    createNote(note, key);
  });


  noteID = getNextIdFromStorage();
};

document.addEventListener('DOMContentLoaded', createNotesFromLocalStorage);

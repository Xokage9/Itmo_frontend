let noteID = 1;
let count = 0;
let first = true;

const sanitizeNote = (note) => {
    return note.replace(/ {2,}/g, ' ').replace(/\n/g, ' ').trim();
};

const removeNote = (id) => {
    let button = document.getElementById(id);
    let div = button.parentNode;
    let container = div.parentNode;

    let noteContentId = 'note-content-' + id.split('-')[1];
    let noteContent = sanitizeNote(document.getElementById(noteContentId).innerText);

    container.removeChild(div);

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let note = sanitizeNote(localStorage.getItem(key));
        if (note === noteContent) {
            localStorage.removeItem(key);
            break;
        }
    }
    count--;
    if (count == 0 && !first) {
        let form = document.getElementById('note-form');
        let deleteAllButton = document.getElementById('delete-all');
        if (deleteAllButton) {
            form.removeChild(deleteAllButton);
        }
        first = true;
    }
};

const deleteAll = () => {
    let container = document.getElementById('notes-container');
    container.innerHTML = '';
    count = 0;
    localStorage.clear();
    if (!first) {
        let form = document.getElementById('note-form');
        let deleteAllButton = document.getElementById('delete-all');
        if (deleteAllButton) {
            form.removeChild(deleteAllButton);
        }
        first = true;
    }
};

const createNote = (text) => {
    let container = document.getElementById('notes-container');
    
    if (text === '') return;

    let template = `
    <div id="note-${noteID}" class="added">
        <p id="note-content-${noteID}">${text}</p>
        <button id="button-${noteID}" onclick="removeNote(this.id)">🗑️</button>
    </div>
    `;

    container.innerHTML = template + container.innerHTML;

    document.getElementById('note-input').value = '';
    noteID++;
    count++;
    
    if (first) {
        let form = document.getElementById('note-form');
        let deleteAllButton = `
        <button id="delete-all" onclick="deleteAll()">Удалить все</button>
        `;
        form.innerHTML += deleteAllButton;
        first = false;
    }
};

const saveToLocalStorage = () => {
    let text = document.getElementById('note-input').value;
    createNote(text);
    localStorage.setItem((noteID - 1).toString(), text);
};

const createNotesFromLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let note = localStorage.getItem(key);
        createNote(note);
    }
};

document.addEventListener('DOMContentLoaded', createNotesFromLocalStorage);
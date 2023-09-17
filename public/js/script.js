/**
 * NotesApp Class: A utility to manage notes using local storage.
 */
class NotesApp {

  /**
   * Constructor: Initializes the notes application by loading notes from local storage.
   */
  constructor() {
      this.notes = this.getNotesFromStorage();
  }

  /**
   * getCurrentTimestamp: Returns the current time in HH:MM:SS format.
   * @returns {string} The current timestamp.
   */
  getCurrentTimestamp() {
      const date = new Date();
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  /**
   * getNotesFromStorage: Fetches notes stored in local storage and returns them.
   * If no notes are found, returns an empty array.
   * @returns {Array} An array of notes.
   */
  getNotesFromStorage() {
      const notes = localStorage.getItem('notes');
      return notes ? JSON.parse(notes) : [];
  }

  /**
   * saveNotesToStorage: Saves a given array of notes to local storage.
   * @param {Array} notes - The notes to be saved.
   */
  saveNotesToStorage(notes) {
      localStorage.setItem('notes', JSON.stringify(notes));
  }

  /**
   * addNewNote: Adds a new note (textarea) to the writer page.
   * Additionally, a remove button is added next to the textarea.
   */
  addNewNote() {
      const container = document.querySelector('.note-container');
      const textArea = document.createElement('textarea');
      const removeButton = document.createElement('button');

      removeButton.textContent = 'Remove';
      removeButton.onclick = () => {
          container.removeChild(textArea);
          container.removeChild(removeButton);
          this.saveCurrentNotes();
      };

      container.appendChild(textArea);
      container.appendChild(removeButton);
  }

  /**
   * saveCurrentNotes: Fetches content from all textareas on the writer page,
   * and saves them to local storage. Updates the last saved timestamp.
   */
  saveCurrentNotes() {
      const textAreas = document.querySelectorAll('.note-container textarea');
      const notes = Array.from(textAreas).map(ta => ta.value);
      this.saveNotesToStorage(notes);
      document.querySelector('.save-time').textContent = 'Last saved at ' + this.getCurrentTimestamp();
  }

  /**
   * displayNotes: Fetches notes and displays them on the reader page.
   * Updates the last retrieved timestamp.
   */
  displayNotes() {
      const displayDiv = document.querySelector('.note-display');
      displayDiv.innerHTML = '';
      this.notes.forEach(note => {
          const p = document.createElement('p');
          p.textContent = note;
          displayDiv.appendChild(p);
      });
      document.querySelector('.retrieval-time').textContent = 'Last retrieved at ' + this.getCurrentTimestamp();
  }

  /**
   * initializeWriter: Sets up the writer page by populating it with notes from local storage.
   * Sets an interval to save notes every 2 seconds.
   */
  initializeWriter() {
    this.notes.forEach(noteContent => {
        this.addNewNote();
        const textAreas = document.querySelectorAll('.note-container textarea');
        textAreas[textAreas.length - 1].value = noteContent;
    });

    if (!this.notes.length) {
        // Add an empty note if no notes are present in local storage
        this.addNewNote();
    }

    setInterval(() => this.saveCurrentNotes(), 2000);
  }

  /**
   * initializeReader: Sets up the reader page by displaying notes from local storage.
   * Sets an interval to refresh and display notes every 2 seconds.
   */
  initializeReader() {
      this.displayNotes();
      setInterval(() => this.displayNotes(), 2000);
  }
}

// Initialization
const app = new NotesApp();

document.addEventListener('DOMContentLoaded', function() {
    if (document.title === 'Writer') {
        app.initializeWriter();
        document.querySelector("button[onclick='addNewNote()']").onclick = () => app.addNewNote();  // Linking the Add Note button
    } else if (document.title === 'Reader') {
        app.initializeReader();
    }
});

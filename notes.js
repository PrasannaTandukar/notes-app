const { notStrictEqual } = require("assert");
const { default: chalk } = require("chalk");
const fs = require("fs");

const getNotes = () => {
  console.log(chalk.green.bold("Your notes...\n"));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.blue(note.title));
    console.log(note.body + "\n");
  });
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicatedNote = notes.find((note) => note.title === title);

  if (!duplicatedNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const noDuplicatedNotes = notes.filter((note) => !(note.title === title));
  if (notes.length === noDuplicatedNotes.length) {
    console.log(chalk.red.inverse("Title not found"));
  } else {
    console.log(chalk.green.inverse("Note was removed!"));
    saveNotes(noDuplicatedNotes);
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const foundNote = notes.find((note) => note.title == title);
  if (foundNote) {
    console.log(chalk.blue.bold(foundNote.title));
    console.log(foundNote.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
};

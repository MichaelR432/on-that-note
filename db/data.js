const fs = require('fs');
const util = require('util');

const writeNote = util.promisify(fs.writeFile);
const readNote = util.promisify(fs.readFile);

class Note {
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    };

    read() {
        return readNote('db/db.json', 'utf8');
    };

    fetchNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Need content for Note');
        }
        const postNote = { title, text };

        return this.fetchNotes()
            .then(notes => [...notes, postNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => postNote);
    }

}

module.exports = new Note();
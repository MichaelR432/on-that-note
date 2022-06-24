// asynchronously write the specified data to a file 
const fs = require('fs');

// defining universal generator 
const UUID = require('uuid');


module.exports = (app) => {

    // writing a get request to call all "notes" from db

    app.get("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            parsedData = JSON.parse(data)
            return res.json(parsedData);
        });
    });

    // writing post request to place data into "notes" in db

    app.post("/api/notes", (req, res) => {
        const newNote = req.body
        newNote.id = UUID.v1();
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let parsedData = JSON.parse(data);
            parsedData.push(newNote);
            let stringedNote = JSON.stringify(parsedData);


            fs.writeFile("./db/db.json", stringedNote, (err) => {
                if (err) throw err;
                return res.json(newNote)
                
            });

        });

    });

    // adding functionality to delete a note from the db

    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            let parsedData = JSON.parse(data);
            parsedData = parsedData.filter(parsedData => parsedData.id !== req.params.id)
            let stringedNote = JSON.stringify(parsedData);

            fs.writeFile("./db/db.json", stringedNote, (err) => {
                if (err) throw err;
                res.json(parsedData)
            });
        });

    });
}



const { notStrictEqual } = require("assert");
const e = require("express");
const fs = require("fs")



module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
       
        let rawData = fs.readFileSync('./db/db.json');
        let notes = JSON.parse(rawData)

        return res.json(notes)

      
    });


    app.post("/api/notes", function(req,res) {

        var newNote = req.body;
        newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();

        let rawData = fs.readFileSync('./db/db.json');
        let notes = JSON.parse(rawData)
        notes.push(newNote)

        fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
            if (err) {
                console.log(err)
            }
            else{
                console.log("commit logged")
            }
        });

        return res.json(notes)

    });

}
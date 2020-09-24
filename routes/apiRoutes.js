
const fs = require("fs")



module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
       
        let rawData = fs.readFileSync('db.json');
        let notes = JSON.parse(rawData)
        return res.json(notes)
      
    });


    app.post(/api/notes, function(req,res) {

        var newNote = req.body;
        newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
        
        fs.writeFile('db.json', newNote)
        
        let rawData = fs.readFileSync('db.json');
        let notes = JSON.parse(rawData)
        return res.json(notes)
    });

}
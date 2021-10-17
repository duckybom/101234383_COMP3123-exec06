const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const NoteSchema = new mongoose.Schema({
    content:{
        noteTitle: {
            type: String,
            required: true
        },
        noteDescription: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true,
            enum: ["LOW","MEDUIM","HIGH"]
        },
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
    }
});

const Note = mongoose.model("note", NoteSchema);
module.exports = Note;
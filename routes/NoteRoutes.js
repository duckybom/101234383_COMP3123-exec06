const noteModel = require('../models/NotesModel.js');
const app = express();
const express = require('express');

app.post('/notes', (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can't be empty"
        });
    }
    const note = new noteModel(req.body);

    await note.save()
        .then(note => {
            res.send(note);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
});

app.get('/notes', (req, res) => {
    noteModel.find()
        .then(note =>{
            res.send(note);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

app.get('/notes/:noteId', (req, res) => {
    try {
        noteModel.findById(req.params.noteId)
            .then(note => {
                if (!note){
                    res.status(500).send({
                        message: "Note not found in the Database"
                    });
                }
                res.send(note);
            });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can't be empty"
        });
    };
    noteModel.findByIdAndUpdate(req.params.noteId, {
        content:req.body.content,
        dateUpdated: Date.now()
    },{new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found"
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found"
            });
        }
        return res.status(500).send({
            message: "Error updating"
        });
    });
});


app.delete('/notes/:noteId', (req, res) => {
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found"
                });
            }
            res.send({message: "Note deleted Successfully"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found"
            });
        }
        return res.status(500).send({
            message: "Note not found
        });
    });


module.exports = app

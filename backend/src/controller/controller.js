const note = require("../Model/Note");

const getAllNotes = async (req,res)=>{
    try {
        const notes = await note.Note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error Ocurred on fetchAllNotes method")
        res.status(500).json({message: "Error Occurred : " + error})
    }
}

const getNoteById = async (req, res) =>{
    try {
        const noteId = await note.Note.findById(req.params.id)
        if(!noteId) return req.status(404).json({message: "Note not found"})
        res.status(200).json(noteId)
    } catch (error) {
        console.error("Error Ocurred on fetchAllNotes method")
        res.status(500).json({message: "Error Occurred : " + error})
    }
}

const createNote = async (req,res)=>{
    try {
        const {title, content} = req.body
        const newNote = new note.Note({title:title, content:content})

        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error Ocurred on createNote method")
        res.status(500).json({message: "Error Occurred : " + error})
    }
}

const updateNote = async (req,res)=>{
    try {
        const {title, content} = req.body
        const updatedNote = await note.Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true})

        if(!updatedNote) return res.status(404).json({message: "Note not Found"})
        
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error Ocurred on updateNote method")
        res.status(500).json({message: "Error Occurred : " + error})
    }
}

const deleteNote = async (req,res)=>{
    try {
        const deletedNote = await note.Note.findByIdAndDelete(req.params.id)

        if(!deletedNote) return res.status(404).json({message: "Note not Found"})
        
        res.status(200).json({messge: "Note deleted successfully"})
    } catch (error) {
        console.error("Error Ocurred on deleteNote method")
        res.status(500).json({message: "Error Occurred : " + error})
    }
}

module.exports = {getAllNotes, getNoteById, createNote, updateNote, deleteNote};
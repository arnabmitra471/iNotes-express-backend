import mongoose from "mongoose";

// Defining the note Schema
const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    note_date : {
        type : Date,
        default : Date.now
    }

})

// Creating the Note model from noteSchema and exporting the model
const Note = mongoose.model("Note",noteSchema)
export default Note
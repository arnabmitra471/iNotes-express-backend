import mongoose from "mongoose";
const {Schema} = mongoose

// Defining the User Schema
const userSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    cpass : {
        type : String,
        required : true
    }
})
// Creating the User model from userSchema and exporting the model
const User = mongoose.model("User",userSchema)
export default User
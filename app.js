import express from "express"
import mongoose from "mongoose"
import auth from "./routes/auth.js"

const app = express()
const port = 3000

let conn = await mongoose.connect("mongodb+srv://arnabmitra471:KxGtotlNePZnJIJ6@inotes.hixjrkk.mongodb.net/notes_app?retryWrites=true&w=majority&appName=iNotes")

app.use("/auth",auth)
app.use(express.static("public"))


app.get("/",(req,res)=>{
  res.send("Hello World !!")
})
app.post("/",(req,res)=>{
  console.log("Hey this is a POST request")
  res.send("Hello World post !!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


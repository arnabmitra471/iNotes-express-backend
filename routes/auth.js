import e from "express";
import User from "../models/User.js"
import bcryptjs from "bcryptjs"

const router = e.Router()

router.use(e.json())
router.post("/signup", async (req, res) => {
    try {
        let user_name = req.body.name
        let user_email = req.body.email
        let user_password = req.body.password
        let conf_pass = req.body.cpass
        console.log(req.body)
        if (!(user_name || user_email || user_password || conf_pass)) {
            return res.status(400).json({ error: "All the fields are required. Please fill in all the fields" })
        }
        else {
            const { password,cpass,email } = req.body
            console.log(password,cpass)
            let salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password,salt)
            const isPassMatch = await bcryptjs.compare(cpass,hashedPassword)
            let user = await User.findOne({ email })

            if(user)
                return res.status(409).json({error: "The user already exists"})

            else if(!isPassMatch)
            {
                return res.status(400).json({error: "Passwords don't match"})
            }
            else
            {
                await User.create({
                    name: user_name,
                    email: user_email,
                    password: hashedPassword,
                    cpass
                })
        }
            res.status(201).json({message: "The user has been created successfully"})
        }
    }
    catch(error){
        res.status(500).json({error : "Internal server error "+error})
    }
})

export default router
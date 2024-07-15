import e from "express";
import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import UserToken from "../models/UserToken.js";

const router = e.Router()
router.use(e.json())


let generateTokens = async (user) => {
    try {
        const payload = {
            _id: user._id
        }
        // generating the access token and refresh token with the given payload
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30m" })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "30d" })

        let userToken = await UserToken.create({ payload, token: refreshToken })
        await userToken.save()
        return Promise.resolve({ accessToken, refreshToken })
    }
    catch (err) {
        return Promise.reject(err)
    }
}
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
            const { password, cpass, email } = req.body
            console.log(password, cpass)
            let salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
            let user = await User.findOne({ email })

            if (user)
                return res.status(409).json({ error: "The user already exists" })

            const isPassMatch = await bcryptjs.compare(cpass, hashedPassword)
            if (!isPassMatch) {
                return res.status(400).json({ error: "Passwords don't match" })
            }
            else {
                const newUser = await User.create({
                    name: user_name,
                    email: user_email,
                    password: hashedPassword,
                    cpass
                })
                const tokens = await generateTokens(newUser)
                res.status(201).json({ message: "The user has been created successfully", accessToken: tokens.accessToken })

            }
        }
    }
    catch (error) {
        console.error("Error during registration !!")
        res.status(500).json({ error: "Internal server error " + error })
    }
})

router.post("/login", async (req, res) => {
    // Extracting the email and password from the request body
    const { email, password } = req.body

    // Fetching the user with the specified email
    let user = await User.findOne({ email })
    /* if the user does not exist then sending an unauthorised status code 401 with a json response
    and immediately returning from the function */
    if (!user) {
        return res.status(401).json({ error: "Invaid credentials. Please register first !!" })
    }
    let isPassMatch = await bcryptjs.compare(password, user.password)
    if (!isPassMatch) {
        return res.status(401).json({ error: "Please enter a valid password" })
    }


})

export default router
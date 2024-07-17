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
        console.log(accessToken,refreshToken)

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
            else {
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
    }
    catch (err) {
        console.error("Error during registration !!")
        res.status(500).json({ error: "Internal server error " + err })
    }
})

router.post("/login", async (req, res) => {
    try {
        // Validating the email and password fields that they must be present
        const {email,password} = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "All the fields are required" })
        }
        else {
            // Extracting the email and password from the request body
            const { email, password } = req.body
            console.log(`Access token secret ${process.env.SECRET_KEY}`)
            console.log(`Refresh token secret ${process.env.REFRESH_TOKEN_SECRET_KEY}`)
            // Fetching the user with the specified email
            let user = await User.findOne({ email })
            console.log(user)
            /* if the user does not exist then sending a 404 Not Found status code with a json response
            and immediately returning from the function */
            if (!user) {
                return res.status(404).json({ error: "Invaid credentials. Please register first !!" })
            }
            let isPassMatch = await bcryptjs.compare(password, user.password)
            if (!isPassMatch) {
                return res.status(401).json({ error: "Please enter a valid password" })
            }
            const tokens = await generateTokens(user)

            return res.status(200).json({ accessToken: tokens.accessToken,refreshToken: tokens.refreshToken })
        }
    }
    catch (err) {
        console.error("Error during login")
        res.status(500).json({ error: "Internal Server Error" })
    }


})

export default router
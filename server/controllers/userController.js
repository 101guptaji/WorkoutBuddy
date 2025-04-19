const userModel = require('../models/userModel');

const jwt = require('../utils/jwtTokens');

// login user
loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate if data exists
        if (!(email && password)) {
            return res.status(400).send("All fields are required");
        }

        let user = await userModel.login(email, password);

        // Generate a JWT token
        const token = jwt.generateToken({ id: user._id });
        user.token = token;

        // dont want to send password
        user.password = undefined;
        
        console.log(user.token);
        res.status(200).json({user, token});
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// signup user
signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // validate if data exists
        if (!(email && password && name)) {
            return res.status(400).send("All fields are required");
        }

        const newUser = await userModel.signup(name, email, password);

        // Generate a JWT token
        const token = jwt.generateToken({ id: newUser._id });
        newUser.token = token;

        // dont want to send password
        newUser.password = undefined;

        res.status(201).json({user: newUser, token});
    } catch (err) {
        console.error("Error while signup", err);
        res.status(500).json({ error: err.message });
    }
}


module.exports = { loginUser, signupUser };

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
        // validate : {
        //   validator : (password) => {
        //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(password);
        //   },
        //   message: props => `${props.value} is not a valid password!`,
        // },
    }
},{timestamps:true});

// user static method to signup user
userSchema.statics.signup = async function (name, email, password) {
    const duplicate = await this.findOne({ email });
    if (duplicate) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPass = await bcrypt.hash(password, salt);

    return await this.create({ name, email, password: encryptedPass });
};

// user static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    return user;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;



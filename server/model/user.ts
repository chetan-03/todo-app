import mongoose from "mongoose";

const User = new mongoose.Schema({
    firstname: {
        type: String,
        require: [true, 'first name is required']
    },
    lastname: {
        type: String,
        require: [true, 'last name is required']
    },
    email: {
        type: String,
        require: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'password is required']
    },
    confirm_password: {
        type: String,
        require: [true, 'confirm password is required']
    }
})

console.log(mongoose.models);

export default mongoose.models?.Users || mongoose.model('Users', User);

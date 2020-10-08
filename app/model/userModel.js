
const mongoose = require('mongoose')
const schema = mongoose.Schema

let userSchema = new schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        default: '',
        required: true
    },
    middleName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
        required: true
    },
    mobileNumber: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String,
        default: 'Shamim@123',
        required: true
    },
    apiKey:{
        type:String,
        default:''
    },
    email: {
        type: String,
        default: '', 
        required: true
    },
    createdOn: {
        type: Date,     
        default:Date.now()
    }

})



module.exports = mongoose.model('users', userSchema)
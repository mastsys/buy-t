import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Account already exists"],
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter your email"],
        minLength: [6, "Your password must be at least 6 characters long"],
        select: false,
    },
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
    },
    status: {
        type: String,
        enum: ["propertyBuyer", "investor"],
        required: [true, "Please specify your status"],
    },
    metamaskWalletAddresses: {
        type: [String],
        // Format: Ethereum Address, e.g., 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
    },
    role: {
        type: String,
        default: 'user',
        enum: {
            values: [
                'user',
                'admin'
            ],
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


export default mongoose.models.User || mongoose.model('User', userSchema) 

import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 8 },
    email: { type: String },
    phoneNumber: { type: Number },
    password: { type: String, required: true, minlength: 8 },

    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    category: { type: mongoose.Types.ObjectId, ref: "category" }
})
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const Users = mongoose.model('User', userSchema);

export default Users;
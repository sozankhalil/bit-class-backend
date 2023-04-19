import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength:8 },
    email:{type:String, required:true},
    phoneNumber:{type:Number, required:true},
    password:{type:String, required:true, minlength:8},

    products:[{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true }
})
userSchema.pre('save', async function (next){
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const Users = mongoose.model('User', userSchema);

export default Users;
import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
fullName:{type:String, required:true, select:false},   //bo password aykay ba fale
isActive:{type:Boolean, default:true },
age:{type:Number, },
email:{type:String},
startDate:{type:Date},
image:{type:String},
documents:{String},
address:{                                   
    city:String,
    street:String,
    houseNumber:Number,
},
contact:Map,

});

const Product =mongoose.model('Product',productSchema);
export default  Product
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name:String, 
    mobileNumber: String,
    email:String
}, {_id: false});

const companySchema = new mongoose.Schema({
    companyName : { type: String, required: true, trim: true},
    companyAddress: { type: String, trim: true},
    companyTelephone: { type: String, trim:true},
    companyEmail: { type: String, trim: true},
    owner:   { type: contactSchema, default: () => ({}) },
    contact: { type: contactSchema, default:()=>({})},
    deactivated: { type: Boolean, default: false}
}, {timestamps: true});

export default mongoose.model('Company', companySchema);
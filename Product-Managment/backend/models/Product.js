import mongoose from 'mongoose';

const localizedText = new mongoose.Schema({
    en: {type: String, default: ''},
    fr: {type: String, default: '' }
}, {_id: false});

const productSchema = new mongoose.Schema({
    name: { type: localizedText, required: true},
    description: { type: localizedText, default: () => ({})},
    gtin:{
        type: String,
        required: true,
        unique: true,
        index:true,
        validate : {
            validator : v => /^\d{13,14}$/.test(v),
            message: 'GTIN must be 13 or 14 digits'
        }
    },
    brand: { type: String, trim: true},
    countryOfOrigin: {type: String, trim: true},
    weight:{ 
        gross: Number,
        net: Number, 
        unit:{type: String, default: 'g'}
    },
    image: { type: String, default : null},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
    hidden: {type: Boolean, default: false}
},{timestamps: true});
    
export default mongoose.model('Product',productSchema);
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    area: {
        type: Number,
        required: [true, "Please specify the property area in square meters"],
    },
    pricePerSquareMeter: {
        type: Number,
        required: [true, "Please specify the price per square meter in euros"],
    },
    initialValue: {  
        type: Number,
        default: function() { return this.area * this.pricePerSquareMeter; },
    },
    currentValue: {  
        type: Number,
        default: function() { return this.initialValue; },
    },
    tokenValue: {  
        type: Number,
        default: null,
    },
    remainingTokens: {  
        type: Number,
        default: null,
    },
    totalTokens: {  
        type: Number,
        default: null,
    },
    city: {  
        type: String,
        required: [true, "Please specify the city of the property"],
    },
    postalCode: {  
        type: String,
        required: [true, "Please specify the postal code of the property"],
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please specify the owner of the property"],
    },
    investorIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isTransactionApproved: {
        type: Boolean,
        default: false, 
    },
    picture: {
        type: String,
        get: function() {
          return `${this._id}.png`;
        }
    },
    SCI: {
        type: String,
        required: [true, "Please specify the SCI of the property"],
    },
});

export default mongoose.models.Property || mongoose.model('Property', propertySchema);

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
    isTransactionApproved: {  // Boolean to specify if the property is approved for transactions
        type: Boolean,
        default: false,  // Default is false
    },
    picture: {
        type: String,
        get: function() {
          return `${this._id}.png`;
        }
    }
});

export default mongoose.models.Property || mongoose.model('Property', propertySchema);

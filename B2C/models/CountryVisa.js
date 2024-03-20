const mongoose = require('mongoose')
let CountryVisaSchema = new mongoose.Schema({
    country_image: {
        type: String,
        required: true
    },
    country_name: {
        type: String,
        required: true
    },
    expected_on: {
        type: Number,
        required: true
    },
    visa_fees: {
        type: Number,
        required: true
    },
    platform_fees: {
        type: Number,
        required: true
    },
    validity: {
        type: Number,
        required: true
    },
    entry_type: {
        type: String,
        required: true
    },
    document_required: {
        type: Array,
        required: true
    }
}
    , {
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.__v;
            }
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
            }
        }
    },
)

module.exports = mongoose.model('countryVisa', CountryVisaSchema)
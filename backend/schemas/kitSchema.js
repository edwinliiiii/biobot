const mongoose = require('mongoose');

const kitSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    label_id: {
        type: String,
        required: true,
    },
    shipping_tracking_code: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Kits', kitSchema, 'kits'); 
                                                                // 'kits' is the collection name.
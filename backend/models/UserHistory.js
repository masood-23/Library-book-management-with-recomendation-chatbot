const mongoose = require('mongoose');


const UserHistorySchema = new mongoose.Schema({
query: String,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('UserHistory', UserHistorySchema);
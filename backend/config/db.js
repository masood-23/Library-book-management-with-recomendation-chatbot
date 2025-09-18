const mongoose = require('mongoose');


const connectDB = async (mongoURI) => {
try {
const uri = mongoURI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_library';
await mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true
});
console.log('MongoDB connected:', uri);
} catch (err) {
console.error('MongoDB connection error', err);
process.exit(1);
}
};


module.exports = connectDB;
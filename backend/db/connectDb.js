const  mongoose =require ("mongoose");
const connectDb = async () => {
    const mongodb_url=process.env.MODE==="DEVELOPMENT" ? process.env.MONGODB_URL_DEV:process.env.MONGODB_URL
    try {
        mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log('Connected to MongoDB successfully'))
            .catch(err => console.error('Failed to connect to MongoDB:', err));
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports=connectDb
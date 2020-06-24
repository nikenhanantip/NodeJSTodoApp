const mongoose = require('mongoose');
const connectionURL = process.env.MONGODB_URL;

mongoose.connect(connectionURL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
    console.log(`Connected to database ${connectionURL}`);
});
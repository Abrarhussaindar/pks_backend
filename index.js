const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


const adminRoute = require('./routes/adminRoutes');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');




// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const url = "mongodb+srv://pksadmin:Admin123@cluster0.oj5e63t.mongodb.net/?retryWrites=true&w=majority"

// Connect to MongoDB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Event handlers for successful connection and error
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
    console.log('Backend server is running! on 8800');
});
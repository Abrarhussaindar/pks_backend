const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


// custome routes
const clientRoute = require('./routes/admin/clientRoutes');
const generalRoute = require('./routes/admin/generalRoutes');
const managementRoute = require('./routes/admin/managementRoutes');
const salesRoute = require('./routes/admin/salesRoutes');

const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const productRoute = require('./routes/productRoutes');
const cartRoute = require('./routes/cartRoutes');
const orderRoute = require('./routes/orderRoutes');
const addressRoute = require('./routes/address');


// config middleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Connect to MongoDB
const url = "mongodb+srv://pksadmin:Admin123@cluster0.oj5e63t.mongodb.net/?retryWrites=true&w=majority"



// Event handlers for successful connection and error
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// route urls
app.use("/api/admin/client", clientRoute);
app.use("/api/admin/general", generalRoute);
app.use("/api/admin/management", managementRoute);
app.use("/api/admin/sales", salesRoute);
app.use("/api/user", userRoute);
app.use("/api/address", addressRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(8800, () => {
        console.log('Backend server is running on port 8800');
    });
}).catch((error) => {
    console.error(`${error} did not connect`);
});

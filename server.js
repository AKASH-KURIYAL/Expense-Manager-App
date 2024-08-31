
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/connectDB');

//config dot env file
dotenv.config();

//database call
connectDB();

//rest object
const app = express();

//midllewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//user routes
app.use('/api/v1/users', require('./routes/userRoute'));
//transaction routes
app.use('/api/v1/transactions',require('./routes/transactionRoutes'));
//static
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})


//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});

//wQSUKuc96YoVRTYe

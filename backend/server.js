const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./src/config/db');
const logrouter = require('./src/routes/logroutes');
const errorHandler = require('./src/middlewares/errorHandler');



app.use(cors({origin:"*"}));
 app.use(cors({
   origin: "https://audit-log-system-iota.vercel.app",
   credentials: true
 }));
app.use(express.json());


app.use("/api/logs",logrouter);

app.use(errorHandler);
const PORT = process.env.PORT  || 5000 ;
  
connectDb();
app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`);
});
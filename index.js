const express = require('express');
const app = express();
const PORT = 8080;
const MovieRoutes = require('./routes/movieRoutes');  

// const dotenv = require('dotenv');
// dotenv.config();
app.use(express.json());
app.use('/',MovieRoutes);

app.listen(PORT, (err)=>{
    if(err){
        console.log("Server not running");
    }else{
        console.log(`Server running at ${PORT}`);
    }
})
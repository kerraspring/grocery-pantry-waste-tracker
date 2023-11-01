const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/database');



app.listen(process.env.PORT, () => {
    console.log("Server is running");
  });

require("dotenv").config({ path: "./config/.env" });

app.use(express.json());

connectDB()


app.get('/', (req,res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
})

app.post('/express_backend', (req, res) => { 
    const { message } = req.body;
    console.log(`${message}`);
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
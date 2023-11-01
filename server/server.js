const express = require("express");
const app = express();
const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`on port ${port}`));

app.use(express.json());

app.get('/', (req,res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
})

app.post('/express_backend', (req, res) => { 
    const { message } = req.body;
    console.log(`${message}`);
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
const express = require("express");
const app = express();
const connectDB = require('./config/database');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const MongoStore = require('connect-mongo');



app.listen(process.env.PORT, () => {
    console.log("Server is running");
  });

require("dotenv").config({ path: "./config/.env" });

app.use(express.json());

connectDB()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRoutes);
app.use('/', authRoutes);

app.get('/', (req,res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
})

app.post('/express_backend', (req, res) => { 
    const { message } = req.body;
    console.log(`${message}`);
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
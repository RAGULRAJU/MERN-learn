const express = require("express");
// const cors = require('cors');
// const mongoose = require('mongoose');
const notesRouter =require("./routes/routes");
const dbConnection = require("./config/db")
const dotenv = require("dotenv");
const { rateLimiter } = require("./Middleware/reateLimiter");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json())
app.use(rateLimiter)

app.use("/api/notes", notesRouter);

// app.use(cors());
// app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);
dbConnection.connectDB().then( ()=>{
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
})
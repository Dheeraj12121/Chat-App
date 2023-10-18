const express = require("express");
const { chats } = require("./data/data");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const colors = require('colors');
const userRoutes = require('./routes/userRoutes')
// middleware
const { notFound, errorHandler} = require('./middleware/errorMiddleware ')

dotenv.config();
connectDB()
const app = express();
app.use(express.json()) // to accept Json DATA

// routes
app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use('/api/user',userRoutes)


app.use(notFound)
app.use(errorHandler)


// dont need
// app.get("/api/chat", (req, res) => {
//     res.send(chats)
//     // console.log(chats);
// });

// app.get('/api/chat/:id',(req, res) =>{
//     // console.log(req.params.id);
//     const singleChat = chats.find((c) =>c._id === req.params.id);
//     res.send(singleChat)
// })


// listen
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started on Port 5000 ${PORT}`.yellow.bold));

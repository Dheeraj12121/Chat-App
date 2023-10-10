const express = require('express');

const app = express();

// routes
app.get('/',(req, res) =>{
    res.send("Api is running")
})
// listen
app.listen(5000,console.log("server started on Port 5000"))
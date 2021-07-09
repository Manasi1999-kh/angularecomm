const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Response from Home Url')
})

app.use('/api',require('./routes/auth'))

app.use('/upload',express.static(path.join('upload')))

// http://localhost:5000/
// http://localhost:5000/api
app.listen(5000 ,()=>{
    console.log('server is running on 5000');
} )
const express = require('express');
const app = express(); 
require('dotenv').config()

app.get('/', (req,res) => {
    res.send('Hello World'); 
});

app.get('/api/courses', (req,res)=>{
    res.send([
        {
            id: 1,
            name: 'REST API'
        },
        {
            id: 2,
            name: 'SEND GRID'
        },
        {
            id: 3,
            name: 'NUXTJS'
        },
        {
            id: 4,
            name: 'DEPLOYMENT'
        },
        {
            id: 4,
            name: 'nodemon'
        },
    ])
});

// PORT
const port = process.env.PORT || 1500;
app.listen(port, () => console.log(`Listening on port ${port} ...`))

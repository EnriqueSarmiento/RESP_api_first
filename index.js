const express = require('express');
const app = express(); 

app.get('/', (req,res) => {
    res.send('Hello World'); 
});

app.get('/api/courses', (req,res)=>{
    res.send([])
});

app.listen(1500, () => console.log('Listening on port 1500...'))

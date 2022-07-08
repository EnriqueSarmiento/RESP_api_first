const Joi = require('joi'); // this is for body validations 
const express = require('express');
const app = express(); 
app.use(express.json());
require('dotenv').config()

const courses = [
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
]

app.get('/', (req,res) => {
    res.send('Hello World'); 
});

app.get('/api/courses', (req,res)=>{
    res.send(courses)
});

app.get('/api/courses/:id', (req,res)=>{
    const finded = courses.find(item => item.id === parseInt(req.params.id))
    if (!finded) res.status(404).send('The course with given id was not found');//404
    res.send(finded)
});

app.post('/api/courses', (req, res) => { 
    const schema =  Joi.object({
        name: Joi.string().min(3).required()
    }); 
    const result = schema.validate(req.body); 
    if(result.error){
        res.status(404).send(result.error.details[0].message)
        return; 
    } 
    const course = {
        id: courses.length + 1, 
        name: req.body.name
    }
    courses.push(course)
    res.send(course); 
})

// PORT
const port = process.env.PORT || 1500;
app.listen(port, () => console.log(`Listening on port ${port} ...`))

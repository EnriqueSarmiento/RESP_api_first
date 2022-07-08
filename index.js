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
        id: 5,
        name: 'nodemon'
    },
]

function validateCourse(course){
    const schema =  Joi.object({
        name: Joi.string().min(3).required()
    }); 
    return schema.validate(course); 
}

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
    const {error} = validateCourse(req.body); // result.error
    if(error){
        res.status(404).send(error.details[0].message)
        return; 
    } 
    const course = {
        id: courses.length + 1, 
        name: req.body.name
    }
    courses.push(course)
    res.send(course); 
})

app.put('/api/courses/:id', (req,res) => {
    // look up for the course
    //if not working, return 404
    const finded = courses.find(item => item.id === parseInt(req.params.id))
    if (!finded) res.status(404).send('The course with given id was not found');//404

    //validate
    //if invalid, return 400 - bad request
    // const result = validateCourse(req.body); 
    const {error} = validateCourse(req.body); // result.error
    if(error){
        res.status(404).send(error.details[0].message)
        return; 
    } 

    //update course
    //  Return the updated course 
    finded.name = req.body.name; 
    res.send(finded);

});

// PORT
const port = process.env.PORT || 1500;
app.listen(port, () => console.log(`Listening on port ${port} ...`))

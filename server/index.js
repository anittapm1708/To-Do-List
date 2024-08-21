
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todoModel = require('./models/Todo')
const app = express();
app.use(cors())
app.use(express.json())

//connect to db
mongoose.connect("mongodb+srv://anittaprojects:projects%40123@cluster1.ffz8q.mongodb.net/Test")

app.post('/add',(req,res)=>{
    const task=req.body.task;
    todoModel.create({
        task:task
    }).then(result=>res.json(result))
    .catch(err=>res.json(err))
    
})

app.get('/get',(req,res)=>{
    todoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const task = await todoModel.findById(id);
    const updatedDone = !task.done;
    
    todoModel.findByIdAndUpdate({_id:id},{done:updatedDone})
    .then(result=>res.json(result))
    .catch(err=>res.status(500).json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    //console.log(id)
    todoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("server running on port 3001")
})
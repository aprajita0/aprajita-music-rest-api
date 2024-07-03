const express = require('express')
const mongoose = require('mongoose')
const Music = require('./models/musicModel')
const app = express()
const cors = require('cors')


mongoose.
connect('mongodb+srv://admin:3169@aprajitaapi.7ia9tya.mongodb.net/Node-API?retryWrites=true&w=majority&appName=AprajitaAPI')
.then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log(error)
})

app.use(cors(
    {
        origin: ["https://deploy-mern-aprajita-api.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
))

app.use(express.json())
app.use(express.urlencoded({exteded: false}))


//routes
app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.get('/music', async(req, res) => {
    try {
        const music = await Music.find({});
        res.status(200).json(music);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get('/music/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const music = await Music.findById(id);
        res.status(200).json(music);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


app.post('/music', async(req, res) => {
    try {
        const music = await Music.create(req.body);
        res.status(200).json(music);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update music entry
app.put('/music/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const music = await Music.findByIdAndUpdate(id, req.body);
        if (!music){
            return res.status(404).json({message: 'Cannot find any songs with given ID {id}'})
        }
        
        const updatedMusic = await Music.findById(id);
        res.status(200).json(updatedMusic);
        

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//delete a song from the DB
app.delete('/music/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const music = await Music.findByIdAndDelete(id);
        if (!music){
            return res.status(404).json({message: 'Cannot find any songs with given ID {id}'})
        }
        res.status(200).json(music);
        

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


mongoose.
connect('mongodb+srv://admin:3169@aprajitaapi.7ia9tya.mongodb.net/Node-API?retryWrites=true&w=majority&appName=AprajitaAPI')
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(5000, () =>{
        console.log("Node API is running on port 5000"
        )
    })
    
}).catch((error) => {
    console.log(error)
})
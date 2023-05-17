const express = require('express');
const app = express();
const helmet = require ('helmet');
const cors = require('cors');
const fs = require('fs');
const { error } = require('console');



const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const password = "password";

app.get('/', (req, res)=>{
    res.send(`<h1> Welcome to the home GET page</h1>`)
})
app.post('/', (req, res)=>{
    res.send(`<h1> Welcome to the home POST page</h1>`)
})
app.delete('/', (req, res)=>{
    res.send(`Done`)
})
app.put('/', (req, res)=>{
    res.send(`<h1> Welcome to the home PUT page</h1>`)
})
app.post('/prompts', (req,res)=>{
    fs.writeFile('./public/prompts.json',  JSON.stringify(req.body),
    err=>{
        if(err) console.log("error from writeFile is", err);
    }
    )
    res.status(201).json({
        status: "success",
        data:"Done"
        })
    }
    )

app.get('/prompts', (req,res)=>{
    // loads the json file as a string, and converts to type JSON object
    const promptsJson = JSON.parse(fs.readFileSync('./public/prompts.json', 'utf-8'));
    res.status(200).json({
        status:'success',
        data:{
            promptsJson
        }
    })
   
})

app.post('/password', (req,res)=>{
    let match ="false";
    const userInput = req.body;
    if(userInput.text ==password) match = "true";
    res.status(201).json({
        status: "success",
        data:match
        })
    }
    )


app.listen(port);



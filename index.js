import  Express  from "express"; 
import Nedb from "nedb";

const app = Express() 

const PORT= 3000

const db = new Nedb({filename: "posts"})
db.loadDatabase();

app.use(Express.json())

// API CRUD

app.post('/api/posts', (req, res) => {
    console.log(req.body)
    db.insert(req.body)
    res.send(req.body)
})

app.get('/api/posts', (req, res) => {
    db.find({}, (err, docs) =>{
      if (err) console.log(err)

      res.send(docs)
    })
})

app.get('/api/posts/:id', (req, res) => {
    db.find({_id:req.params.id}, (err, docs) =>{
      if (err) console.log(err)

      res.send(docs)
    })
})

app.patch('/api/posts/:id', (req, res) => {
  db.update({_id: req.params.id}, { $set: { ...req.body }})
 res.send(req.body)
})

app.delete('/api/posts/:id', (req, res) => {
  db.remove({_id: req.params.id})
})

app.listen(PORT, () => {
    console.log(`server lancé sur le port: ${PORT}`)
})
import express, { urlencoded } from 'express'
import Router from './router/route.js'
import cors from 'cors'
// import mysql from './model/db.js'

const App = express()


App.use(express.json())
App.use(urlencoded({extended:true}))

App.use(cors({
  origin: "http://localhost:5173", // 👈 replace with your React app URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true // optional — use if you send cookies or auth headers
}));


App.use('/api' , Router)

// App.get('/home' , (req,res)=>{
//     res.status(201).send("heelo hero");
    
// })


export default App
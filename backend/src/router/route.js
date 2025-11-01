import express from 'express'
import { login, register } from '../controller/BasicController.js';
import {create , readALL , update ,deleteswap  } from '../controller/logicalController.js'

const Router = express.Router()

Router.post('/signup' , register)

Router.post('/login' , login)

Router.get('/readall' , readALL)
Router.post('/create' , create)

Router.patch('/update' ,update)
Router.delete('/deleteswap' , deleteswap)





export default Router
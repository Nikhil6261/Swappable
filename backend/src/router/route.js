import express from 'express'
import { login, register } from '../controller/BasicController.js';
import {create , readALL , update , readonly  } from '../controller/logicalController.js'

const Router = express.Router()

Router.post('/signup' , register)

Router.post('/login' , login)

Router.get('/readall',  readALL)
Router.post('/create' ,create )

Router.get('/single' ,readonly )

Router.patch('/update/:id' ,update)

export default Router
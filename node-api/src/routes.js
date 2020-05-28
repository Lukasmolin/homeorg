const express = require('express');
const routes = express.Router();

const userController = require('./controller/userController');

//User
routes.get('/user', userController.index)
routes.post('/user', userController.create)

routes.get('/user/:id', userController.info)
routes.put('/user/:id', userController.edit)
routes.delete('/user/:id', userController.delete)

routes.get('/user/:id/payment', (req, res) => { res.status(501).send() })
routes.post('/user/:id/payment', (req, res) => { res.status(501).send() })

//Payment
routes.get('/payment/:id', (req, res) => { res.status(501).send() })
routes.put('/payment/:id', (req, res) => { res.status(501).send() })
routes.delete('/payment/:id', (req, res) => { res.status(501).send() })

module.exports = routes;
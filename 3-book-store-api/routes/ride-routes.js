const express = require('express')
const rideRouter = express.Router()

const {getRideInfoHandler, addNewRideHandler, removeRideHandler} = require('../handlers/ride-handlers')

// rideRouter.get('/rollercoaster', rollerCoasterHandler)
// rideRouter.get('/mountain-edge-drop', mountainEdgeDropHandler)
// rideRouter.get('/cup-swing', cupSwingHandler)
// rideRouter.get('/banging-cars', bangingCarsHandler)

rideRouter.post('/add-new-ride', addNewRideHandler)
rideRouter.delete('/delete-a-ride/:ride', removeRideHandler)
rideRouter.get('/info/:ride', getRideInfoHandler)

module.exports = rideRouter;
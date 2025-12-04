const express = require('express')

const workRouter = express.Router();

const {bookingTicketHandler, deleteBookingHandler, modifyBookingHandler, checkBookingHandler} = require('../handlers/work-handlers')

workRouter.post('/book-tickets', bookingTicketHandler)
workRouter.delete('/delete-booking', deleteBookingHandler)
workRouter.put('/modify-booking', modifyBookingHandler)
workRouter.get('/check-booking', checkBookingHandler)

module.exports = workRouter
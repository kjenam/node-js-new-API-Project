// park 
// route to book tickets
// login and authenticate as admin
// watch and select rides that you want to ride while booking your tickets and your ticket price will change accordingly
// add a method to pay aswell? do later
// different rides also have different pages -> routes
// roller coaster
// cup swing
// mountain edge drop
// banging cars


const express = require('express')
const workRoutes = require('./routes/work-routes')
const rideRoutes = require('./routes/ride-routes')
const homeRoute = require('./routes/home-route')
const connectToDB = require('./database/database')
const authRoutes = require('./routes/auth-routes')

const app = express();
const PORT = 3000

app.use(express.json())
app.use('/', homeRoute)
app.use('/park/work', workRoutes)
app.use('/park/rides', rideRoutes)
app.use('/auth', authRoutes)

connectToDB()


app.listen(PORT, () => {
  console.log("app has started on port 3000 \n http://localhost:3000")
  console.log("app has started on port 3000 \n http://localhost:3000/auth/register")
})
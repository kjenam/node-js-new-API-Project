const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
  origin: "http://localhost:3000"
}));

app.get('/data', (req,res) => {
  const dummyData = {
    users: [{id:1, name: 'Abhinav' , email: 'abhinavprajapati351@gmail.com'}]
  }
  return res.json({data:dummyData})
})

app.listen(7000, () => {
  console.log("Server is running on port 7000")
})
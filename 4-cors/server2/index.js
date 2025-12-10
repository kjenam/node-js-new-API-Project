const express = require('express')
const app = express()
const cors = require()


app.get('/data', (req,res) => {
  const dummyData = {
    users: [{id:1, name: 'Abhinav' , email: 'abhinavprajapati351@gmail.com'}]
  }
  return res.json({data:dummyData})
})

app.listen(8000, () => {
  console.log("Server is running on port 8000")
})
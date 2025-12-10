const express = require('express');
const {loginHandler, registerHandler} = require('../handlers/authHandlers')
const authRouter = express.Router();

authRouter.use('/login', loginHandler)
authRouter.post('/register', registerHandler)

module.exports = authRouter
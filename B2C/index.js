const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')

// MIDDLEWEARES
dotenv.config({ path: './config/config.env' })
require('./config/db')
app.use(cors())
app.use(express.json())
app.use(morgan('dev')) // for logging

// ROUTES
// app.use('/api/v1', require('./routes/posts'))
// app.use('/api/v1', require('./routes/auth'))
// app.use('/api/v1', require('./routes/features'))
app.use('/api/visa/', require('./routes/countryVisa'))

PORT  = process.env.PORT || 5000
app.listen(PORT,'192.168.0.103', console.log(`SERVER RUNNING ON PORT: ${PORT}`), console.log(`go to http://192.168.0.103:${PORT}`))
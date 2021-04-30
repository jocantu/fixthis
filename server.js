const express = require('express')
const morgan = require('morgan')
const app = express()
const connectDB = require('./config/database')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mainRoutes = require('./routes/main')
const personRoutes = require('./routes/persons')
const flash = require('express-flash')
const mongoose = require('mongoose')

// Use .env file in config folder
require('dotenv').config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

// Connec to Database
connectDB()

// Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Using EJS for ejs files.
app.set('view engine', 'ejs')

// Static folder for the public ejs
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)
app.use('/persons', personRoutes)



const PORT = process.env.PORT 

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
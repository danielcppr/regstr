require('dotenv').config({path: './config/.env'})

const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

const flash = require('connect-flash')
app.use(flash())

const session = require('express-session')
const passport = require('passport')
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }))

const index = require('./routes/index')


app.set('view engine', 'ejs')

//Prevents "css was blocked due to MIME type mismatch (X-Content-Type-Options: nosniff)" error 
app.use('/assets', express.static(__dirname + '/assets'))


app.use('/', index)


//Port config
const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
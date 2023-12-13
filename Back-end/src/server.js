import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
require('dotenv').config()

let app = express()
let port = process.env.PORT || 8769

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

app.listen(port, () => {
    console.log(`Backend listening on port: ${port}`)
})

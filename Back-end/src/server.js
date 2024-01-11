import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connection from './config/connectDb';
import cors from 'cors';
import cookieParser from 'cookie-parser'
require('dotenv').config()
import initApiRoutes from './routes/api';

let app = express()
let port = process.env.PORT || 8769
// app.use(cors())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json({ limit: '5mb' })); // Ví dụ giới hạn 5MB
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

// app.use(cors())

viewEngine(app)

// Connect DB
connection()


initApiRoutes(app)
initWebRoutes(app)

app.use((req, res, next) => {
    res.send('404 Not found')
})

app.listen(port, () => {
    console.log(`Backend listening on port: ${port}`)
})
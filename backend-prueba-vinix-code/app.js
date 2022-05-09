const express = require('express')
const router = express.Router()
const cors = require("cors")

const app = express()

app.use(cors());
//cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const db = require('./models')
db.sequelize.sync()

app.use(express.json());
app.use(cors());

const routes = require('./routes')
app.use('/', routes)

app.listen(4000, console.log("Server in the port 4000"))
const express = require('express'),
      Router = require('./routes/routes'),
      database = require('./config/database'),
      path = require('path')

const cors = require('cors')    
      
const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname,'dbimages')))

app.use(express.json())
   .use(database)
   .use('/api',Router)


app.listen(4000,()=>console.log('server on port 4000'))
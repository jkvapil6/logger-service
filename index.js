const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const jsonParser = bodyParser.json()

// app.use(bodyParser.urlencoded())
// app.use(bodyParser.json({  type: "*/*" })) 

// app.use(bodyParser.json())
// app.use(bodyParser.raw())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000

const LOGTYPE_INFO = 'info'
const LOGTYPE_WARNING = 'warning'
const LOGTYPE_SUCCESS = 'success'

const logs = [{
  id: 0,
  type: LOGTYPE_INFO, 
  timestamp: Date.now().valueOf(),
  message: "Test"
}]

///
/// Return all logs
/// 
app.get('/all', (req, res) => {
  res.send(logs)
})


///
///
///


///
/// Delete log by id
///
app.post('/delete', async (req, res) => {
  console.log(req)
  

  try {
    const { id } = req.body 


    console.log(id)
  } catch (error) {
    res.status(500).send({ error })
  }

  res.send(logs)
})

///
/// Run server
///
app.listen(port, () => {
  console.log(`Log service listening at http://localhost:${port}`)
})
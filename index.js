const express = require('express')
const app = express()
const fs = require('fs/promises')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 3333
const DB_PATH = './logs.json'

const LOGTYPE_INFO = 'info'
const LOGTYPE_WARNING = 'warning'
const LOGTYPE_SUCCESS = 'success'

///
/// Initialize db with some random log data
///
const initLogs = async () => {
  const logTypes = [LOGTYPE_INFO, LOGTYPE_WARNING, LOGTYPE_SUCCESS]
  const logs = []
  for (let i = 1; i < 1000; i++) {
    const rand = Math.floor(Math.random() * 10)
    logs.push({
      id: i,
      type: logTypes[(i + rand) % logTypes.length], 
      timestamp: Date.now().valueOf(),
      message: `Test log ${i}`
    })
  }
  
  const logsStr = JSON.stringify(logs)
  await fs.writeFile(DB_PATH, logsStr, "utf8")
}


///
/// Return all logs
/// 
app.get('/all', async (req, res) => {
  try {
    const all = await fs.readFile(DB_PATH, "utf-8")
    const parsed = JSON.parse(all)
    res.status(200).send(parsed)
  } catch (error) {
    res.status(500).send({ error })
  }
})


///
/// Return success logs
/// 
app.get('/success', async (req, res) => {
  try {
    const all = await fs.readFile(DB_PATH, "utf-8")
    const logs = JSON.parse(all)
    const filtered = logs.filter(log => log.type == LOGTYPE_SUCCESS)

    res.status(200).send(filtered)
  } catch (error) {
    res.status(500).send({ error })
  }
})


///
/// Return info logs
/// 
app.get('/info', async (req, res) => {
  try {
    const all = await fs.readFile(DB_PATH, "utf-8")
    const logs = JSON.parse(all)
    const filtered = logs.filter(log => log.type == LOGTYPE_INFO)

    res.status(200).send(filtered)
  } catch (error) {
    res.status(500).send({ error })
  }
})


///
/// Return warning logs
/// 
app.get('/warning', async (req, res) => {
  try {
    const all = await fs.readFile(DB_PATH, "utf-8")
    const logs = JSON.parse(all)
    const filtered = logs.filter(log => log.type == LOGTYPE_WARNING)

    res.status(200).send(filtered)
  } catch (error) {
    res.status(500).send({ error })
  }
})


///
/// Delete log by id
///
app.post('/delete', async (req, res) => {
  try {
    const { id } = req.body 
    if (typeof(id) === "undefined") {
      res.status(400).send({ error: "Missing ID of deleted log" })
      return
    }
    const all = await fs.readFile(DB_PATH, "utf-8")
    const logs = JSON.parse(all)
    const filtered = logs.filter(log => log.id != id)
    console.log(`Deleting log with id ${id}...`)

    const logsStr = JSON.stringify(filtered)
    await fs.writeFile(DB_PATH, logsStr, "utf8")
    res.status(200).send({ id })
  } catch (error) {
    res.status(500).send({ error })
  }
})

///
/// Run server
///
initLogs()
app.listen(PORT, async () => {
  console.log(`Log service listening at http://localhost:${PORT}`)
})
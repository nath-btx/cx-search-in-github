const express = require('express')
const cors = require('cors')
const initDatabase = require('./database')
const path = require('path');
const fetch = require("node-fetch");
const insertIntoTable = require('./insertIntoTable.js')


function run(port) {
  const app = express()
  const db = initDatabase()

  // cross origin request 
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }))

  app.use(express.static(path.join("server", "src","main.js")))

  app.get('/users/:username', (req, res) => {
    fetch("https://api.github.com/users/" + req.params.username)
    .then(result => result.json())
    .then(function (result) {
      insertIntoTable(result)

    })
    res.send(req.params.username)
  })

  app.get('/',(req,res) => {
    res.send("hello from express")
  })


  app.listen(port, () => {
    console.log(`✨ Server is listening on port ${port}`)
  })
}

/**
 * Entry point
 */
// ["node", "src/main.js", "4242"] -> ["4242"]
const args = process.argv.slice(2)
if (args.length !== 1) {
  console.log("Usage: node src/main.js <port>")
  process.exit(0)
}

const port = args[0]
run(parseInt(port, 10))



const fs = require('fs')
const path = require('path')
const express = require('express')
const database = require("./connect")
const app = express()

const entry = fs.readFileSync(
  path.resolve(__dirname, '..', 'dist/index.html'),
  'utf8',
)

app.get('/api/healthcheck', (req, res) => {
  return res.send('Healthy!')
})

app.get('/searchquery', (req, res) => {
  database.queryDb(function(result) {
    res.json(result);
  })
})

app.use('/', (req, res) => res.send(entry))

module.exports = app
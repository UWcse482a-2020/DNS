const fs = require('fs')
const path = require('path')
const express = require('express')
const database = require("./connect")
const app = express()

const index = fs.readFileSync(
  path.resolve(__dirname, '..', 'src/index.html'),
  'utf8',
)
const browse = fs.readFileSync(
  path.resolve(__dirname, '..', 'src/categories.html'),
  'utf8',
)
const product = fs.readFileSync(
  path.resolve(__dirname, '..', 'src/product-page.html'),
  'utf8',
)

const contact = fs.readFileSync(
  path.resolve(__dirname, '..', 'src/contact.html'),
  'utf8',
)

app.get('/api/healthcheck', (req, res) => {
  return res.send('Healthy!')
})

app.get('/searchquery', (req, res) => {
  database.queryDb(req.query['query'], function(result) {
    res.json(result);
  })
})

app.get('/register', (req, res) => {
  var username = req.query['username'];
  var email = req.query['email'];
  var password = req.query['password'];
  var errorCount = 0;
  database.checkUserExists({"username": username}, function(result) {
    if (result > 0) {
      return res.json("Username already taken. Please try again.");
    } else {
      database.checkUserExists({"email": email}, function(result) {
        if (result > 0) {
          return res.json("Email already taken. Please try again.");
        } else {
          database.registerUser(req.query, function(result) {
          })
          return res.json("Registration Successful. Please sign in.");
        }
      })
    }
  })
})

app.use(express.static(path.resolve(__dirname, "..")))
app.use('/categories.html', (req, res) => res.send(browse))
app.use('/product-page.html', (req, res) => res.send(product))
app.use('/contact.html', (req, res) => res.send(contact))
app.use('/', (req, res) => res.send(index))


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
module.exports = app
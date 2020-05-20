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

const register = fs.readFileSync(
  path.resolve(__dirname, '..', 'src/register.html'),
  'utf8',
)

const login = fs.readFileSync(
  path.resolve(__dirname, '..', 'src/login.html'),
  'utf8',
)

const profile = fs.readFileSync(
  path.resolve(__dirname, '..', 'src/profile.html'),
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

app.get('/login', (req, res) => {
  var username = req.query['username'];
  var password = req.query['password'];
  database.checkUserExists({"username": username}, function(result) {
    if (result == 0) {
      return res.json("User does not exist.");
    } else {
      database.loginUser(req.query, function(result) {
      })
      return res.json("Log in Successful");
    }
  })
})

app.use(express.static(path.resolve(__dirname, "..")))
app.use('/categories.html', (req, res) => res.send(browse))
app.use('/product-page.html', (req, res) => res.send(product))
app.use('/register.html', (req, res) => res.send(register))
app.use('/login.html', (req, res) => res.send(login))
app.use('/profile.html', (req, res) => res.send(profile))
app.use('/', (req, res) => res.send(index))


// var server = app.listen(8081, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log("Example app listening at http://%s:%s", host, port)
// })
const port = process.env.PORT || 3000;
app.listen(port, function() {
  
});
module.exports = app
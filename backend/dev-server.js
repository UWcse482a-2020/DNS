// dev-server.js
const path = require('path')
const Bundler = require('parcel-bundler')
const app = require('./server')

//const entry = path.resolve('/src/index.html')
const bundle = new Bundler("src/index.html")

app.use(bundle.middleware())

app.listen(process.env.PORT, err => {
  if (err) throw err

  //console.log(`Listening at http://localhost:${process.env.PORT}`)
})
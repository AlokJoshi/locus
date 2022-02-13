const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

app.use(express.static(__dirname))
app.get('*', function (req, res) {
  console.log(`Sending index.html`)
  res.sendFile(path.join(__dirname,"index.html"))
})
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
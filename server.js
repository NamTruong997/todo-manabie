const express = require('express')
var compression = require('compression')

const app = express()
const path = require("path");
app.use(
  compression()
);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || 4000, () => {
  console.log('App listening on port 4000')
})
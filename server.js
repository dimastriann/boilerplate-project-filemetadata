var express = require('express');
var cors = require('cors');
const multer = require("multer");
const upload = multer({ dest: "./public/upload_files"});
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// endpoint for file upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file, req.upfile);
  const { 
    originalname: name, 
    mimetype: type,
    size
  } = req.file;
  return res.json({
    name,
    type,
    size
  })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

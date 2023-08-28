const express = require('express');
const uploadFileToGoogleDrive = require('./upload');
const multer = require('multer');
const fs = require('fs');

const dir = './upload';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload') // Podmień na ścieżkę do folderu, gdzie chcesz zapisywać pliki
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Podmień na nazwę pliku, jaką chcesz używać
  }
})

const upload = multer({ storage: storage })
const app = express();
const router = express.Router();

router.post('/upload', upload.single('image'), (req, res, next) => {

  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  uploadFileToGoogleDrive(req.file.path, req.file.mimetype, req.file.originalname).then(() => {
    console.log('🔥 All files have been uploaded to Google Drive successfully!');
    res.status(200).send('File uploaded successfully.');
  });
});

app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.listen(3000, () => {
  console.log('App is listening on port 3000.');
});



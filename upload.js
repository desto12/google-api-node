const fs = require('fs');
const drive = require('./service.js')

const uploadFileToGoogleDrive = async (imagePath, mimeType, fileName) => {
  console.log(imagePath);
  console.log(mimeType)
  let fileMetadata = {
    name: fileName, 
    parents: ['106cQ4znA78Efb9m_9XBR3j02NmsPl0it']
  };
  let media = {
    mimeType: mimeType,
    body: fs.createReadStream(imagePath) 
  }

  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, (err, file) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File Id:', file);
    }
  });
}

module.exports = uploadFileToGoogleDrive
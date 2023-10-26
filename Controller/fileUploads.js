const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const uploadImage = async (req, h) => {
//   try {
//     const { filename } = req.payload.file;

//     // Save the uploaded image to a directory
//     const imageDir = __dirname + '../../uploads/';
//     const newFilePath = imageDir + filename;

//     // Store image information in Prisma
//     const prisma = new Prisma.PrismaClient();
//     const createdImage = await prisma.image.create({
//       data: {
//         filename,
//         path: newFilePath,
//       },
//     });

//     const response = {
//       message: 'File upload successful',
//       image: createdImage,
//     };

//     return response;
//   } catch (error) {
//     return h.response('Image not found').code(404);
//   }
// };

// const fs = require('fs');
const Path = require('path');

const uploadImage = async (request, h) => {
  try {
 console.log('Received payload:', request.payload);

  const { file } = request.payload;
  if (!file) {
    return h.response('No file uploaded.').code(400);
  }
  const uploadPath = Path.join(__dirname,"../Uploads",file.hapi.filename);

  const fileStream = fs.createWriteStream(uploadPath);

  const fileUpload =await  new Promise((resolve, reject) => {
    file.on('data', (data) => {
      fileStream.write(data);
    });

    file.on('end', () => {
      fileStream.end();
      resolve('File uploaded successfully.');
    });

    file.on('error', (err) => {
      reject(err);
    });
  })
  await prisma.Image.create({
    data:{
      filename:file.hapi.filename,
      path:""
    }
  })
  return h.response('File uploaded successfully.'+ `file name ${file.hapi.filename}`).code(201)
} catch (error) {
  console.log(error.message)
  return h.response('Error fetching image links').code(500);
}
};


const getImageLinks = async (request, h) => {
  try {
    const Image = await prisma.Image.findMany({
      where:
        { filename: request.params.filename }
    });

    return h.file(Image[0].filename)

  } catch (error) {
    return h.response('Error fetching image links').code(500);
  }
};

module.exports = { uploadImage, getImageLinks };

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  region: process.env.AWS_REGION,

  signatureVersion: "v4",
});
const fs = require("fs");

exports.uploadImage = async ({ imageBase64, imageId }) => {
  const buffer = Buffer.from(
    imageBase64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageId,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
  };

  const response = await s3.upload(params).promise();

  return response.Location;
};

exports.getAlbumFiles = async (albumName) => {
  albumName = albumName.split("/");
  var folderDepth = albumName.length;

  albumName = albumName.map((name) => encodeURIComponent(name)).join("/");

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: albumName + "/",
  };

  let files = await s3.listObjects(params).promise();

  files = files.Contents.map((file) => file.Key.split("/")[folderDepth]).filter(
    (file) => file !== ""
  );

  return files;
};

exports.deleteFile = (fileId) => {
  const params = {
    Key: fileId,
    Bucket: process.env.AWS_BUCKET_NAME,
  };
  return s3.deleteObject(params).promise();
};

exports.deleteImageFromAlbum = (albumName, imageId) => {
  const params = {
    Key: imageId,
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: encodeURIComponent(albumName) + "/",
  };
  return s3.deleteObject(params).promise();
};

exports.deleteImagesFromAlbum = (imagesIds) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: {
      Objects: imagesIds,
      Quiet: false,
    },
  };

  // const params = {
  //   Key: imageId,
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Prefix: encodeURIComponent(albumName) + "/",
  // };

  return s3.deleteObjects(params).promise();
};

exports.uploadFile = async ({ filePath, fileId, fileName }) => {
  const params = {
    ACL: "public-read",
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileId,
    Body: fs.createReadStream(filePath),
    ContentDisposition: `attachment; filename=${fileName}`,
  };
  const response = await s3.upload(params).promise();
  fs.unlinkSync(filePath);

  return response.Location;
};

exports.downloadFile = async ({ fileId, fileName, res }) => {
  res.attachment(fileName);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileId,
    // ContentDisposition: `attachment; filename=${fileName}`,
  };
  const file = s3.getObject(params).createReadStream();
  file.pipe(res);
};

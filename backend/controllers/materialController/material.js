const { Material } = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const awsS3 = require("../../services/aws_s3");
const AppError = require("../../utils/appError");
const { generateUniqueId } = require("../../utils");

exports.addMaterial = catchAsync(async (req, res, next) => {
  const { lectureId } = req.params;
  let files = [];
  let uploadFilesPromises = [];

  req.files.forEach((file) => {
    const uniqueId = generateUniqueId(2);
    files.push({ id: uniqueId, lectureId, name: file.originalname });

    uploadFilesPromises.push(
      awsS3.uploadFile({
        filePath: file.path,
        fileId: `lectures/${encodeURIComponent(lectureId)}/files/${uniqueId}`, // .${file.originalname.split(".").pop()}
        fileName: file.originalname,
      })
    );
  });

  await Promise.all(uploadFilesPromises);

  await Material.bulkCreate(files, {
    validate: true,
  });

  res.status(201).end();
});

exports.getLectureMaterial = catchAsync(async (req, res, next) => {
  const { lectureId } = req.params;

  const lectureFilesIds = await awsS3.getAlbumFiles(
    `lectures/${encodeURIComponent(lectureId)}/files`
  );

  let files = [];
  if (lectureFilesIds.length) {
    files = await Material.findAll({
      where: {
        lectureId,
        id: lectureFilesIds,
      },
      raw: true,
    });
  }

  res.status(200).json(files);
});

exports.downloadMaterial = catchAsync(async (req, res, next) => {
  const { materialId } = req.params;

  const material = await Material.findByPk(materialId);

  if (material) {
    return awsS3.downloadFile({
      fileId: `lectures/${encodeURIComponent(material.lectureId)}/files/${
        material.id
      }`,
      fileName: material.name,
      res,
    });
  }

  res.status(200).end();
});

exports.deleteMaterial = catchAsync(async (req, res, next) => {
  const { materialId } = req.params;

  const material = await Material.findByPk(materialId);

  if (material) {
    await awsS3.deleteFile(
      `lectures/${encodeURIComponent(material.lectureId)}/images/${material.id}`
    );
    await Material.destroy({
      where: {
        id: material.id,
      },
    });
  } else {
    throw new AppError("No material was found with that id", 404);
  }

  res.status(204).end();
});

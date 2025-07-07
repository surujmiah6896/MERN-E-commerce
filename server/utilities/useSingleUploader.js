//dependence
const multer = require('multer');
const path = require('path');
const createError = require('http-errors');
const fs = require("fs");


const useSingleUploader = (sub_folder_path, allowed_file_types, max_file_size, error_msg) => {
  const UPLOADS_FOLDER = path.join(
    __dirname,
    "../public/uploads",
    sub_folder_path
  );

  // Ensure folder exists or create it
  if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
  }
 
  //define the store
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      fullName = fileName + fileExt;
      cb(null, fullName);
    },
  });

  const update = multer({
    storage: storage,
    limits: {
      fieldSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });
  return update;
}

module.exports = useSingleUploader;
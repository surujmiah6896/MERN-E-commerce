//dependence
const multer = require('multer');
const path = require('path');
const createError = require('http-errors');


const useSingleUploader = (subFolderPath, allowedFileTypes, maxFileSize, errorMsg) => {
    //file upload folder
    const UPLOADS_FOLDER = `${__dirname}/..public/uploads/${subFolderPath}/`;

    //define the store
    const storage = multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cd)=>{
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-")+"-"+Date.now();
            fullName = fileName+fileExt;
            cb(null, fullName);
        },
    });

    const update = multer({
        storage:storage,
        limits: {
            fieldSize: maxFileSize,
        },
        fileFilter: (req, file, cb)=>{
            if(allowedFileTypes.includes(file.mimetype)){
                cb(null, true);
            }else{
                cb(createError(errorMsg));
            }
        },
    });
  return update;
}

export default useSingleUploader;

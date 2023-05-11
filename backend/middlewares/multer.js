import multer from "multer";

const storage = multer.diskStorage({
    //set the file destination
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    //set the file name
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// const fileFilter = (req, file, cb) => {
//     if (
//         file.mimetype === "image/jpeg" ||
//         file.mimetype === "image/png" ||
//         file.mimetype === "text/plain" ||
//         file.mimetype === "application/pdf" ||
//         file.mimetype === "application/vnd.ms-excel" ||
//         file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
//         file.mimetype === "application/msword" ||
//         file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
//         cb(null, true);
//     } else {
//         cb(null, false);
//         return cb(new Error('Only the following extensions are allowed: .jpg, .png, .txt, .pdf, .doc, .docx, .xls, .xlsx'));
//     }
// }

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },

})


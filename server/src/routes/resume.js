const express = require("express");
const { protect } = require("../middleware/auth.js");
const multer = require("multer");
const { analyzeResume } = require("../controller/resumecontroller.js");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        console.log("file.mimetype:", file.mimetype);
        console.log(
            "MIME type:",
            file.mimetype,
        )
        const allowedTypes = [
            "application/pdf",
            "text/plain",
            "application/octet-stream",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            console.log("Invalid file type:", file.mimetype);
            cb(new Error("Invalid file type"), false);
        }
    }
});

console.log("protect:", typeof protect);
console.log("analyzeResume:", typeof analyzeResume);
console.log("upload:", typeof upload);
console.log("upload.single:", typeof upload.single);

router.post(
    "/analyze",
    protect,
    upload.single("resume"),
    analyzeResume
);

module.exports = router;
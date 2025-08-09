const MULTER = require('multer');
const path = require('path');

const storage = MULTER.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedExtensions = ['.jpeg', '.jpg', '.png', '.gif'];

    const extName = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    if (allowedMimeTypes.includes(mimeType) && allowedExtensions.includes(extName)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }
};

const upload = MULTER({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter
});

module.exports = upload.single('profilePicture');
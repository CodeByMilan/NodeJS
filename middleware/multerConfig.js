const multer = require('multer');


const storage =multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')//cb(error,success)
        },
        filename: (req, file, cb) => {
            const filename =Date.now()+"-"+file.originalname
            cb(null, filename)//cb(error,success)
            }
})

module.exports={
    multer,
    storage
}
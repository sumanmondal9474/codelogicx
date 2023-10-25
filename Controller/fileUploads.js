const fs = require('fs');

const fileUpload = async (req, res) => {

    try {
        console.log(__dirname)
        fs.createWriteStream(__dirname + "../../uploads/" + req.payload.file.filename)

        let details = {
            msg: 'File upload successfull'
        }
        return details
    } catch (error) {
        console.log(error)
    }
}

module.exports = fileUpload;
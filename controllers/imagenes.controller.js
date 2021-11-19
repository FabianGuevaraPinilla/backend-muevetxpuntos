var path = require('path');
var fs = require('fs');
const filepathError = path.join(__dirname, '../assets/images/cross.jpg');

function getContentImage(filename) {
    var ext = path.extname(filename);
    switch (ext) {
        case '.gif':
            return 'image/gif'
        case '.jpg':
            return 'image/jpg'
        case undefined:
            return 'text/plain'
    }
}

exports.getImagenPremio = (req, res, next) => {
    let filename = req.params.name;
    let filepath = path.join(__dirname, '../assets/images/premios/' + filename);
    console.log(filepath);

    fs.stat(filepath, function (err, stat) {
        if (err) {
            fs.stat(filepathError, (errRespaldo, statRespaldo) => {
                var img = fs.readFileSync(filepathError);
                res.contentType = getContentImage(filename);
                res.contentLength = statRespaldo.size;
                res.end(img, 'binary');
            })
            return
        }
        var img = fs.readFileSync(filepath);
        res.contentType = 'image/jpg';
        res.contentLength = stat.size;
        res.end(img, 'binary');
    });
}
exports.getImagenEvento = (req, res, next) => {
    let filename = req.params.name;
    let filepath = path.join(__dirname, '../assets/images/eventos/' + filename);
    console.log(filepath);

    fs.stat(filepath, function (err, stat) {
        if (err) {
            fs.stat(filepathError, (errRespaldo, statRespaldo) => {
                var img = fs.readFileSync(filepathError);
                res.contentType = getContentImage(filename);
                res.contentLength = statRespaldo.size;
                res.end(img, 'binary');
            })
            return
        }
        var img = fs.readFileSync(filepath);
        res.contentType = 'image/jpg';
        res.contentLength = stat.size;
        res.end(img, 'binary');
    });
}
const textract = require('textract');
const fileType = require('file-type');
const PdfReader = require('pdfreader').PdfReader;
const util = require('util');
const fromBufferWithMime = util.promisify(textract.fromBufferWithMime);
// const parsePDFBuffer = util.promisify(new PdfReader().parseBuffer);
const Q = require('q');

module.exports.fromBuffer = (buffer) => {
    try {
        const mime = fileType(buffer).mime
        if (mime === "application/pdf") {
            return getPdfText(buffer);
        } else {
            return fromBufferWithMime(mime, buffer).catch(err => {
                if (err) {
                    console.error(err);
                }
                return Q('');
            });
        }
    } catch (err) {
        console.error(err);
        return Q('');
    }
}

function getPdfText(buffer) {
    var defer = Q.defer();
    let text = '';
    new PdfReader().parseBuffer(buffer, (err, item) => {
        if (err) {
            console.error(err);
            defer.reject(text);
        } else if (!item) {
            defer.resolve(text);
        } else if (item.text) {
            text += (' \n ' + item.text);
        }
    });
    return defer.promise;
}
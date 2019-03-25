const textract = require('./helpers/textract');
const analysis = require('./helpers/analysis');
const fs = require('fs');

function analysisPath(path) {
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            var curPath = path + "/" + file;
            console.log(curPath);
            var stat = fs.statSync(curPath);
            if (stat.isFile()) {
                textract.fromBuffer(fs.readFileSync(curPath)).then(string => {
                    var tenWords = analysis.getMostlyMeaningFulWords(string);
                    console.log(JSON.stringify({
                        file: curPath,
                        tenWords: tenWords
                    }));
                })
            }
        })
    }
}

analysisPath('C:/Users/admin/Documents/WeChat Files/wxid_hnqk752nrpon22/FileStorage/File/2019-03');
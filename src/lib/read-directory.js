const fs = require('fs');

module.exports = path => {
    return new Promise((resolve, reject) => {
        try {
            fs.readdir(`${__dirname}/../${path}`, {encoding: 'utf8'}, (err, files) => {
                if(err) {
                    reject(err);
                }
                resolve(files);
            });
        } catch(err) {
            reject(err);
        }
    });
};

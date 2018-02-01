const fs = require('fs');

module.exports = filename => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(`${__dirname}/../${filename}`, (err, buffer) => {
                if(err) {
                    reject(err);
                }
                resolve(buffer);
            });
        } catch(err) {
            reject(err);
        }
    });
};

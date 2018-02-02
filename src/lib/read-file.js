const fs = require('fs');
const path = require('path');

module.exports = filename => {
    return new Promise((resolve, reject) => {
        try {
            const filePath = path.resolve(__dirname, '../../node_modules/sourcier-content', filename)
            fs.readFile(filePath, (err, buffer) => {
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

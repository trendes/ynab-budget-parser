'use strict';

const https = require('https');
const { URL } = require('url');

const get = url => {
    return new Promise((resolve, reject) => {
        const options = new URL(url);

        const request = https.request(options, response => {
            response.setEncoding('utf8');

            let responseData = '';

            response.on('data', data => {
                responseData += data;
            });

            response.on('end', () => {
                resolve(responseData);
            });
        });

        request.on('error', error => {
            reject(error);
        });

        request.end();
    });
}

module.exports = {
    get
    //post,
    //put
};
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (error) =>
        error ? console.error(error) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const readAndRemove = (file, id) => {
    fs.readFile(file, 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            const parsedData = JSON.parse(data);
            const result = parsedData.filter(note => note.id !== id)
            writeToFile(file, result);
        }
    });
}

module.exports = { readFromFile, writeToFile, readAndAppend, readAndRemove };
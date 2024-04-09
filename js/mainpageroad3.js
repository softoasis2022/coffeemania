'use strict';

const express = require('express');
const main = express();
const path = require('path');
const fs = require('fs');

const serverstart_port = 3001;

main.use(express.json());
main.listen(serverstart_port, () => {
    console.log(serverstart_port + "번에서 서버가동"); //터미널에 출력
});

main.set("views", "./mainpage");

const templatePath = path.join(__dirname, "/../mainpage/mainpagetamplete/coffeemainpagetample.html");
const userdata = "D:user/";

main.get("/", (req, res) => {
    const pagePath = path.join(__dirname, "/../mainpage/coffeemania.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/login", (req, res) => {
    const pagePath = path.join(__dirname, "/../mainpage/coffeemania_login.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/join", (req, res) => {
    const pagePath = path.join(__dirname, "/../mainpage/coffeemania_register.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/buisness", (req, res) => {
    const pagePath = path.join(__dirname, "/../mainpage/coffeemania_buisness.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/eventpage", (req, res) => {
    const pagePath = path.join(__dirname, "/../mainpage/coffeemania_event.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/operation", (req, res) => {
    const pagePath = path.join(__dirname, "/../mainpage/coffeemania_operation.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.post('/login_pass', (req, res) => {
    const { email, password } = req.body;
    login_file(email, password, (err, token) => {
        if (err) {
            res.status(200).json({ "token": err });
        } else {
            res.status(200).json({ "token": token });
        }
    });
});

main.post('/buinessinfo', (req, res) => {
    const data = req.body;
    res.json({ message: "buisness_successfully" });
    saveDataToFile(data, "비즈니스", (err) => {
        if (err) {
            console.error('Error saving data to file:', err);
        }
    });
});

main.post('/operation', (req, res) => {
    const data = req.body;
    res.status(200).json({ message: '지원완료' });
    saveDataToFile(data, "프로젝트 참가", (err) => {
        if (err) {
            console.error('Error saving data to file:', err);
        }
    });
});

function applyPageToTemplate(templatePath, pagePath) {
    let template = loadTemplate(templatePath);
    let pageContent = loadPage(pagePath);
    const mainPageRegex = /<div id="mainpage"><\/div>/;
    return template.replace(mainPageRegex, `<div id="mainpage">${pageContent}</div>`);
}

function loadTemplate(templatePath) {
    return fs.readFileSync(templatePath, 'utf-8');
}

function loadPage(pagePath) {
    return fs.readFileSync(pagePath, 'utf-8');
}

function login_file(email, pw, callback) {
    const loginfilePath = `D:/user/${email}.json`;
    fs.access(loginfilePath, fs.constants.F_OK, (err) => {
        if (err) {
            callback('no_user');
            return;
        } else {
            fs.readFile(loginfilePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    callback('error_reading_file');
                    return;
                }
                let userData = {};
                try {
                    userData = JSON.parse(data);
                } catch (parseError) {
                    callback('error_parsing_json');
                    return;
                }
                if (userData.pw === pw) {
                    let randomString = generateRandomString(30);
                    saveTokenToFile(email, randomString, (err) => {
                        if (err) {
                            callback('error_saving_token');
                        } else {
                            callback(null, randomString);
                        }
                    });
                } else {
                    callback('password_mismatch');
                }
            });
        }
    });
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

function saveTokenToFile(email, token, callback) {
    const loginfilePath = `D:/user/${email}.json`;
    fs.readFile(loginfilePath, 'utf8', (err, data) => {
        if (err) {
            callback('error_reading_file');
            return;
        }
        let userData = {};
        try {
            userData = JSON.parse(data);
        } catch (parseError) {
            callback('error_parsing_json');
            return;
        }
        userData.token = token;
        fs.writeFile(loginfilePath, JSON.stringify(userData), 'utf8', (writeErr) => {
            if (writeErr) {
                callback('error_writing_file');
                return;
            }
            callback(null);
        });
    });
}

function saveDataToFile(data, action, callback) {
    const directoryPath = getDirectoryPath(action);
    if (!directoryPath) {
        callback('invalid_action');
        return;
    }
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    const fileName = `${data.marketname}.json`;
    const filePath = path.join(directoryPath, fileName);
    if (!fileExists(filePath)) {
        fs.writeFile(filePath, JSON.stringify(data), 'utf8', (err) => {
            if (err) {
                callback('error_writing_file');
            } else {
                callback(null);
            }
        });
    } else {
        console.log('File already exists. Skipping saving data.');
        callback(null);
    }
}

function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

function getDirectoryPath(action) {
    switch (action) {
        case "비즈니스":
            return path.join('D:', '민섭', '비즈니스');
        case "프로젝트 참가":
            return path.join('D:', '민섭', '프로젝트 참가');
        default:
            console.error("Invalid action:", action);
            return null;
    }
}

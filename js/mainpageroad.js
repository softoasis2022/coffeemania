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

const templatePath = path.join(__dirname, "/../page/mainpage/tamplate/coffeemainpagetample.html");
const ref_database = "D:";

main.get("/", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/login", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_login.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/join", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_register.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/buisness", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_buisness.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/eventpage", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_event.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/operation", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_operation.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});

main.get("/pay", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_pay.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});
main.get("/operationinfo", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_operationinfo.html");
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

main.post('/buisness', (req, res) => {
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
    saveDataToFile(data, data.action , (err) => {
        if (err) {
            console.error('Error saving data to file:', err);
        }
    });
});
main.post('/operationinput', (req, res) => {
    const data = req.body;
    res.status(200).json({ message: '지원완료' });
    saveDataToFile(data, data.action , (err) => {
        if (err) {
            console.error('Error saving data to file:', err);
        }
    });
});


//---------------------------------------------------------------------------------------------------------------------------------------------------------
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
//---------------------------------------------------------------------------------------------------------------------------------------------------------
function login_file(email, pw, callback) {
    const loginfilePath = `D:/database/user/${email}.json`;
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
//---------------------------------------------------------------------------------------------------------------------------------------------------------
function saveDataToFile(data, action, callback) {
    const directoryPath = getDirectoryPath(action, data); // 저장 경로 설정
    let fileName = '';

    if (!directoryPath) { // 관련 없는 action이 유입 : 다른 action이 유입이 되없다면 파일 경로가 정해 지지 않는다.
        callback('invalid_action');
        return;
    }
    if (!fs.existsSync(directoryPath)) { // 파일경로가 있는지 확인
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    if (action == "프로젝트 참가") {
        fileName = `${data.operation}.json`;
        const filePath = path.join(directoryPath, fileName);
        operation_input(filePath, [data], (error) => {
            if (error) {
                console.error('Error saving data to file:', error);
            } else {
                console.log('Data saved to file successfully.');
            }
        });
    }
    if (action == "비즈니스") {
        fileName = `${data.marketname}.json`;
        buisness_input(directoryPath, fileName, data, (error) => {
            if (error) {
                console.error('Error saving data to file:', error);
            } else {
                console.log('Data saved to file successfully.');
            }
        });
    }
}
function fileExists(filePath) {  //파일이 존재 하는지 알아 보는 함수
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}
function getDirectoryPath(action,data) { //action 유입에 따라 파일경로를 전달
    const ref_database_root = 'company';
    switch (action) {
        case "비즈니스":
            return path.join(ref_database, ref_database_root,'비즈니스');
        case "프로젝트 참가":
            return path.join(ref_database,ref_database_root,"지원자");
        default:
            console.error("Invalid action:", action);
            return null;
    }
}
function buisness_input(directoryPath, fileName, data, callback) {
    const filePath = path.join(directoryPath, fileName); // 파일경로와 파일이름이 합쳐진다
    if (!fileExists(filePath)) { // 파일이 존재 하지 않늕다면
        fs.writeFile(filePath, JSON.stringify(data), 'utf8', (err) => { // 파일 출력
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
function operation_input(filePath, newData, callback) {
    // 파일이 존재하는지 확인
    if (!fileExists(filePath)) {
        // 파일이 존재하지 않을 경우 새로운 배열에 데이터를 추가하고 파일에 쓴다
        fs.writeFile(filePath, JSON.stringify(newData), 'utf8', (err) => { // 파일 출력
            if (err) {
                callback('error_writing_file');
            } else {
                callback(null);
            }
        });
    } else {
        // 파일이 이미 존재할 경우 기존 데이터를 읽어와서 배열에 추가하고 다시 파일에 쓴다
        fs.readFile(filePath, 'utf8', (err, fileData) => { // 파일 읽기
            if (err) {
                callback('error_reading_file');
                return;
            }
            try {
                const existingData = JSON.parse(fileData); // 기존 데이터 파싱
                existingData.push(...newData); // 기존 데이터에 새로운 데이터 추가
                fs.writeFile(filePath, JSON.stringify(existingData), 'utf8', (err) => { // 파일 출력
                    if (err) {
                        callback('error_writing_file');
                    } else {
                        callback(null);
                    }
                });
            } catch (parseError) {
                console.error('Error parsing existing data:', parseError);
                callback('error_parsing_existing_data');
            }
        });
    }
}

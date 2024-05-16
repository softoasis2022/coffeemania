'use strict';

const express = require('express');
const main = express();
const path = require('path');
const fs = require('fs');

const cheerio = require('cheerio');
const http = require('http');
const url = require('url');
const querystring = require('querystring');


//npm install firebase

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged   } = require('firebase/auth');

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname,"/../softoasis.json"), 'utf-8'))["firebaseConfig"];

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

//writeUserData("사용자 아이디","사용자이름" ,"사용자이메일","링크");
function writeUserData(userId, name, email, imageUrl) {
    set(ref(database, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    }).then(() => {
        console.log('Data write successful.');
    }).catch((error) => {
        console.error('Error writing data: ', error);
    });
}


const serverstart_port = 3001;

const pageref = "/../page";

main.use(express.json());
main.listen(serverstart_port, () => {
    console.log(serverstart_port + "번에서 서버가동"); //터미널에 출력
});

main.set("views", "./mainpage");

const templatePath = path.join(__dirname,pageref+  "/mainpage/tamplate/coffeemainpagetample.html");
const ref_database = "D:";
const ref_searchmainkeyword = path.join(ref_database,"database", "search", "keyword", "mainkeyword.json");
const ref_userinfodata=path.join(ref_database,"database", "userinfo");
const sellertemplatePath = path.join(__dirname, "/../page/sellerpage/tamplate/sellerpagetamplate.html");
const ref_searchkeyword = path.join("database", "search", "keyword", "searchkeyword");
const ref_useremail = path.join(ref_database, "database","user");

main.get("/", (req, res) => {
    // URL을 파싱하여 query 객체를 가져옴
    const parsedUrl = url.parse(req.url);
    const query = querystring.parse(parsedUrl.query);
    
    // token 값을 가져옴
    const token = query.token;
    let renderedTemplate;
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_mainhome.html");
    
    try{
        const userinfo_path = path.join(ref_userinfodata,`${token}.json`);s
        console.log(token); // 토큰 값 출력
        const userdata= fs.readFileSync(userinfo_path, 'utf-8');
        console.log(userdata);
        
        renderedTemplate = applyPageToTemplate(templatePath, pagePath);
        //헤드테그 안에 script테그안에 userdata데이터 넣기
        const scriptTag = `<script>var userdata = ${userdata};</script>`;
        renderedTemplate = renderedTemplate.replace("</head>", scriptTag + "</head>");
        const keyword = fs.readFileSync(ref_searchmainkeyword, 'utf-8');
        const keywordscriptTag = `<script>var mainkeyword = ${keyword};</script>`;
        renderedTemplate = renderedTemplate.replace("</head>", keywordscriptTag + "</head>");  
    }
    catch{
        renderedTemplate = applyPageToTemplate(templatePath, pagePath);
        const keyword = fs.readFileSync(ref_searchmainkeyword, 'utf-8');
        const keywordscriptTag = `<script>var mainkeyword = ${keyword};</script>`;
        renderedTemplate = renderedTemplate.replace("</head>", keywordscriptTag + "</head>");
    }
    res.send(renderedTemplate);
});
main.get("/search", (req, res) => {
    const search = req.query.search;
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_search.html");
    const filePath = path.join(ref_database, ref_searchkeyword, `${search}.json`);
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    //완성된 html정보에 해드테그 안에 스크립트테그를 추가하고 스크립트 테그에 아이디값과 아래의 json데이터를 넣는다.
    //{
    //    "key1": "value1",
    //    "key2": "value2"
    //    // 필요한 만큼의 데이터 추가
    //}
    
    //console.log(typeof(productdata[0])); 타입 : string
    
    let responsedata= [];
    if(fileExists(filePath)){
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const productdata = jsonData["product"];
        const findproduct = searchproduct(productdata);
        if(findproduct.length > 0){
            const scriptTag = `<script id="json-data">${JSON.stringify(findproduct)}</script>`;
        
            // 템플릿에 스크립트 태그 추가
            renderedTemplate = renderedTemplate.replace('</head>', `${scriptTag}</head>`);
            res.send(renderedTemplate);
        }
    }
    else{
        //해당하는 상품이 없음
        res.send(renderedTemplate);
    }
    /** 
    const jsonData = {
        "key1": "value1",
        "key2": "value2"
        // 필요한 만큼의 데이터 추가
    }; //데이터를 가져오는 함수로 변경 예정
    */
    // HTML 페이지에 스크립트 태그 추가

    //console.log(findproduct);
    //console.log(findproduct);
    

    

    // 최종 HTML 페이지 응답
    
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
main.get("/brendstory", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania_brendstory.html");
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);
    res.send(renderedTemplate);
});


main.post('/search', (req, res) => {
    const { search } = req.body;
    let mainkeyword = mainkeyword();
    let ex_search = "원두";
    if(mainkeyword.includes(ex_search)){
        
    }
});
main.post('/login_pass', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userlogin(email, password);  // userlogin 함수가 반환하는 Promise를 기다립니다.
        console.log(token);
        res.status(200).json({ token: token });  // 토큰을 응답으로 보냅니다.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });  // 에러가 발생하면 에러 메시지를 응답으로 보냅니다.
    }
});
main.post('/join_pass', async (req, res) => {
    const { email,password } = req.body;
    console.log(email,password);
    if(email == "0000"){
        res.status(200).json({ race : "이미 이메일 이존재 합니다" });
    }
    try {
        const token = await userjoin(email, password);  // userlogin 함수가 반환하는 Promise를 기다립니다.
        console.log(token);
        res.status(200).json({ token: token });  // 토큰을 응답으로 보냅니다.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });  // 에러가 발생하면 에러 메시지를 응답으로 보냅니다.
    }
});
main.post('/email_pass', (req, res) => {
    const { email } = req.body;
    console.log(email+"@coffeemanias.com");
    const useremail = path.join(ref_useremail , `${email}.json`);
    try {
        const data = fs.readFileSync(useremail, 'utf-8');
        console.log(data);
        console.log("이미존재 하는 이메일 입니다.");
        res.status(200).json({ message : "이미 존재 하는 이메일 입니다." });  // 토큰을 응답으로 보냅니다.
    } catch (error) {
        console.error('Error reading file:', error.errno);
        console.log("사용 가능한 이메일입니다.");
        res.status(200).json({ message : "사용 가능한 이메일입니다." });  // 토큰을 응답으로 보냅니다.
    }
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
function saveTokenToFile(data,callback) {
    console.log(data);
    const loginfilePath = `D:/database/user/${data.Uid}.json`;
    
    fs.writeFile(loginfilePath, JSON.stringify(data), 'utf8', (writeErr) => {
        if (writeErr) {
            callback('error_writing_file');
            return;
        }
        callback(null);
    });
}
function user(){

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
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function mainkeyword(keyword){
    //d 드리이브에 검색메인 키워드파일에 작성된 키워드 정보를 받아옴
    let searchmainkeyword = JSON.parse(fs.readFileSync(pagePath, 'utf-8'));
    console.log(searchmainkeyword);
}
function userlogin(email, password){
    return new Promise((resolve, reject) => {
        email = email + '@coffeemanias.com';
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential;
            console.log(user);
            
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    console.log(uid);
                    resolve(uid);  // Promise를 uid로 해결합니다.
                } else {
                    reject(new Error('User is signed out'));  // 유저가 로그아웃된 경우 Promise를 거부합니다.
                }
            });
        })
        .catch((error) => {
            reject(error);  // 에러가 발생하면 Promise를 거부합니다.
        });
    });
}
function userjoin(email,password){
    console.log(email,password );
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential;
        //console.log(user);
        const data = {
            email : email,
            password : password,
            Uid : userCredential.user.uid
        }
        saveTokenToFile(data, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File written successfully');
            }
        });
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
    });
}

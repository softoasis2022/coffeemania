'use strict';

const express = require('express');
const main = express();
const login_main = express();
const app = express();


const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');  // 파일 시스템 모듈 불러오기
const path = require('path');

const serverstart_port = 5000;

//임시 로그인 데이터 처리 서버 완성
main.use(express.json());
main.listen(serverstart_port,function(){
    console.log(serverstart_port + "번에서 서버가동") //터미널에 출력
});
main.set("views", "./mainpage")

const templatePath = path.join(__dirname, "/../mainpage/mainpagetamplete/coffeemainpagetample.html");

main.get("/", (req, res) => {
    // 페이지 고정 html 탬플릿 파일경로
    
    
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../testhtml/test.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(templatePath, pagePath);

    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});

function loadTemplate(templatePath) {
    return fs.readFileSync(templatePath, 'utf-8');
}
function loadPage(pagePath) {
    return fs.readFileSync(pagePath, 'utf-8');
}
// 함수: 탬플릿 안에 넣을 페이지 html 적용
function applyPageToTemplate(templatePath, pagePath) {
    let template = loadTemplate(templatePath);
    let pageContent = loadPage(pagePath);

    const mainPageRegex = /<div id="mainpage"><\/div>/;
    return template.replace(mainPageRegex, `<div id="mainpage">${pageContent}</div>`);
}



function login2(email,pw){
    //user,id,pw 값을 localhost:5000/loginpass 로 전송
    // 같은 폴더 안에 userinfo/user/userdata.json을 찾아 pw이 일치하는지 확인후 콘솔에 출력
    
    
    //console.log(`email: ${email} , pw : ${pw} `)

    // 보낼 데이터
    const data = JSON.stringify({
        email: email,
        pw : pw
    });
    
    // 요청 옵션 설정
    const options = {
        hostname: '192.168.0.2',
        port: 200,
        path: '/login_pass', // 요청을 보낼 경로
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
        }
    };
    
    // 요청 생성
    const req = http.request(options, (res) => {
        //console.log(`Status Code: ${res.statusCode}`);
    
        res.on('data', (d) => {
            //process.stdout.write(d);
            const dd = JSON.parse(d);
            //console.log({'message' : dd.message,'email': email,'pw': pw});
            return data
        });
    });
    
    // 요청 에러 핸들링
    req.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
    
    // 데이터 전송
    req.write(data);
    req.end();
}
function login_api(email,pw){
    //user,id,pw 값을 localhost:5000/loginpass 로 전송
    // 같은 폴더 안에 userinfo/user/userdata.json을 찾아 pw이 일치하는지 확인후 콘솔에 출력
    
    
    //console.log(`email: ${email} , pw : ${pw} `)

    // 보낼 데이터
    const data = JSON.stringify({
        email: email,
        pw : pw
    });
    
    // 요청 옵션 설정
    const options = {
        hostname: '192.168.0.2',
        port: 3001,
        path: '/login_pass', // 요청을 보낼 경로
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
        }
    };
    
    // 요청 생성
    const req = http.request(options, (res) => {
        //console.log(`Status Code: ${res.statusCode}`);
    
        res.on('data', (d) => {
            //process.stdout.write(d);
            const dd = JSON.parse(d);
            //console.log({'message' : dd.message,'email': email,'pw': pw});
            if(data > ''){
                return data
            }
            else {
                return "계정 정보 없음"
            }
            
        });
    });
    
    // 요청 에러 핸들링
    req.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
    
    // 데이터 전송
    req.write(data);
    req.end();
}
function login_api(email,pw){
    //user,id,pw 값을 localhost:5000/loginpass 로 전송
    // 같은 폴더 안에 userinfo/user/userdata.json을 찾아 pw이 일치하는지 확인후 콘솔에 출력
    
    
    //console.log(`email: ${email} , pw : ${pw} `)

    // 보낼 데이터
    const data = JSON.stringify({
        email: email,
        pw : pw
    });
    
    // 요청 옵션 설정
    const options = {
        hostname: '192.168.0.2',
        port: 3001,
        path: '/login_pass', // 요청을 보낼 경로
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
        }
    };
    
    // 요청 생성
    const req = http.request(options, (res) => {
        //console.log(`Status Code: ${res.statusCode}`);
    
        res.on('data', (d) => {
            //process.stdout.write(d);
            const dd = JSON.parse(d);
            //console.log({'message' : dd.message,'email': email,'pw': pw});
            if(data > ''){
                return data
            }
            else {
                return "계정 정보 없음"
            }
            
        });
    });
    
    // 요청 에러 핸들링
    req.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
    
    // 데이터 전송
    req.write(data);
    req.end();
}
function joinemail_waitsave(){
    // 파일이 존재하는지 확인
    const filePath = 'F:/user/'+ +'.json';
    
}
function checkFileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true; // 파일이 존재하는 경우 true 반환
    } catch (err) {
        return false; // 파일이 존재하지 않는 경우 false 반환
    }
}
function server_open_to_close() {
    const port = 3002;
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Server is running!');
    });

    const currentTime = new Date().getHours();
    const isWorkingHours = currentTime >= 9 && currentTime <= 18;

    if (isWorkingHours) {
        server.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } else {
        console.log('It is outside of working hours. Server will not be started.');
    }
}
function buisness(businessInfo, res) {
    const filePath = '드라이브/비즈니스/문의/business_info.txt';

    fs.writeFile(filePath, businessInfo, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Error writing file');
        } else {
            console.log('Business info saved successfully');
            res.status(200).send('저장완료');
        }
    });
}
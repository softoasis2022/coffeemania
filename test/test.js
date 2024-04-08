'use strict';

const express = require('express');
const main = express();
const login_main = express();
const app = express();


const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');  // 파일 시스템 모듈 불러오기
const path = require('path');
const { type } = require('os');

const serverstart_port = 3001;

//임시 로그인 데이터 처리 서버 완성
main.use(express.json());
main.listen(serverstart_port,function(){
    console.log(serverstart_port + "번에서 서버가동") //터미널에 출력
});
main.set("views", "./mainpage")

const userfile = 'F:' + "유저/";

main.get("/", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    //console.log(req.url);
    
    
    fs.readFile(__dirname + "/../mainpage/coffeemania.html", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        
        // HTML 파일을 cheerio로 로드
        const $ = cheerio.load(data);

        // id가 'mainitem'인 div 태그 내부에 id가 'text'인 p 태그 추가

        // 수정된 HTML을 문자열로 변환
        const modifiedHtml = $.html();

        // 클라이언트에게 수정된 HTML 전송
        res.send(modifiedHtml);

        console.log("방문자확인")
    });
});

main.post('/operation', (req, res) => {
    const { name, nickname, operation, phonenumber1, phonenumber2, phonenumber3, portfolio, skill } = req.body;

    const operation_input_data = `
        name: ${name}
        nickname: ${nickname}
        operation: ${operation}
        phonenumber1: ${phonenumber1}
        phonenumber2: ${phonenumber2}
        phonenumber3: ${phonenumber3}
        portpolio: ${portfolio}
        skill: ${skill}
    `;

    // 현재 시간을 이용하여 파일 이름 생성 (예: 2022-01-01T12:00:00_operation.json)
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const fileName = `${name}.json`;

    // 파일 저장 경로 설정 (예: d드라이브 안에 있는 파일 루트 지원자/opration)
    const directory = path.join('F:', '지원자', operation);

    // 파일 경로 설정
    const filePath = path.join(directory, fileName);

    // 폴더가 없으면 생성
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    // 데이터를 JSON 형식으로 파일에 쓰기
    fs.writeFile(filePath, JSON.stringify(operation_input_data, null, 4), (err) => {
        if (err) {
            console.error('파일 저장 중 오류 발생:', err);
            res.status(500).send('파일 저장 중 오류 발생');
        } else {
            console.log('데이터가 파일에 성공적으로 저장되었습니다.');
            res.status(200).json({ message: '지원완료' });
        }
    });
});

function user(){

}

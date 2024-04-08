'use strict';

const express = require('express');
const main = express();
const login_main = express();
const app = express();

const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');  // 파일 시스템 모듈 불러오기
const path = require('path');

//임시 로그인 데이터 처리 서버 완성
main.use(express.json());
main.listen(200,function(){
    console.log("서버가동") //터미널에 출력
});
main.set("views", "./mainpage")

main.get("/admin", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    console.log(req.url)
    
    
    fs.readFile(__dirname + "/../mainpage/admin/coffeemania_admin.html", 'utf8', (err, data) => {
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

        console.log("어드민확인")
    });
});
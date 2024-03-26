
'use strict';

const express = require('express');
const app = express();
const cheerio = require('cheerio');


const fs = require('fs');  // 파일 시스템 모듈 불러오기


app.use(express.json());
const login_pass_port = 3000;

app.listen(login_pass_port,function(){
    console.log("서버가동") //터미널에 출력
});
app.set("views", "./mainpage")
app.set("view engine", "ejs")



app.get("/login", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    fs.readFile(__dirname + "/../mainpage/coffeemania_login.html", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }

        // 클라이언트에게 수정된 HTML 전송
        res.send(data);

        console.log("로그인 방문자 확인")
    });
    
    // 뒤에 로그인 시도 정보가 없다면 로그인 기본 페이지 로그인 시도 정보가 있으면 로그인 기능 실행

});
app.get("/", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    console.log(req.url)
    
    
    fs.readFile(__dirname + "/../mainpage/coffeemania.html", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        
        // HTML 파일을 cheerio로 로드
        const $ = cheerio.load(data);

        // id가 'mainitem'인 div 태그 내부에 id가 'text'인 p 태그 추가
        $('#mainspace_center').append('<iframe src="main_event" width="100%" height="max-content"></iframe>');

        // 수정된 HTML을 문자열로 변환
        const modifiedHtml = $.html();

        // 클라이언트에게 수정된 HTML 전송
        res.send(modifiedHtml);

        console.log("방문자확인")
    });
});
app.get("/main_event", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    fs.readFile(__dirname + "/../mainpage/mainpagespase_1.html", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        // 클라이언트에게 수정된 HTML 전송
        const $ = cheerio.load(data);
    
            // id가 'mainitem'인 div 태그 내부에 id가 'text'인 p 태그 추가
        $('#mainspace_center').append('<iframe src="main_event" width="100%" height="max-content"></iframe>');

        // 수정된 HTML을 문자열로 변환
        const modifiedHtml = $.html();

        // 클라이언트에게 수정된 HTML 전송
        res.send(modifiedHtml);
        
    });
});
function login(user,id,pw){
    //user,id,pw 값을 localhost:5000/loginpass 로 전송
    // 같은 폴더 안에 userinfo/user/userdata.json을 찾아 pw이 일치하는지 확인후 콘솔에 출력
    
}

app.post('/login_pass', (req, res) => {
    // 클라이언트로부터 전송받은 이메일과 비밀번호를 추출
    const { email, password } = req.body;

    // 서버 콘솔에 이메일과 비밀번호 출력
    console.log('이메일:', email);
    console.log('비밀번호:', password);

    // 추가기능 리스트
    // 1.이메일과 테스워드를 확인하고 로그이
    console.log(`email: ${email} , pw : ${password} `)

    // 클라이언트에 응답 전송
    res.status(200).json({ message: '로그인 정보를 성공적으로 받았습니다.' });
});
app.get("/buisness", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    console.log(req.url)
    fs.readFile(__dirname + "/../mainpage/coffeemania_buisness.html", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }

        // 클라이언트에게 수정된 HTML 전송
        res.send(data);

        console.log("비즈니스 요청 페이지 확인")
    });
    
    // 뒤에 로그인 시도 정보가 없다면 로그인 기본 페이지 로그인 시도 정보가 있으면 로그인 기능 실행

});
app.get("/operation", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    console.log(req.url)
    fs.readFile(__dirname + "/../mainpage/coffeemania_operation.html", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }

        // 클라이언트에게 수정된 HTML 전송
        res.send(data);

        console.log("채용페이지 확인")
    });
    
    // 뒤에 로그인 시도 정보가 없다면 로그인 기본 페이지 로그인 시도 정보가 있으면 로그인 기능 실행

});

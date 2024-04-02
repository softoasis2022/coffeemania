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

login_main.use(express.json());
app.listen(200,function(){
    console.log("서버가동") //터미널에 출력
});
main.use(express.json());
main.listen(3001,function(){
    console.log("서버가동") //터미널에 출력
});
main.set("views", "./mainpage")

main.get("/login", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    fs.readFile(__dirname + "/../mainpage/coffeemania_login.html", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }

        // 클라이언트에게 수정된 HTML 전송
        res.send(data);
    });
    
    // 뒤에 로그인 시도 정보가 없다면 로그인 기본 페이지 로그인 시도 정보가 있으면 로그인 기능 실행
    console.log("로그인페이지확인")
});
main.get("/", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    //console.log(req.url)
    
    
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
main.get("/main_event", (req, res) => {  // 로그인 으로 인입이 되면 러 
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
function login(email,pw){
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
        hostname: '192.168.0.3',
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
main.post('/login_pass', (req, res) => {
    // 클라이언트로부터 전송받은 이메일과 비밀번호를 추출
    const { email, password } = req.body;

    // 서버 콘솔에 이메일과 비밀번호 출력
    console.log('이메일:', email);
    console.log('비밀번호:', password);

    // 추가기능 리스트
    // 1.이메일과 테스워드를 확인하고 로그이
    //console.log(`email: ${email} , pw : ${password} `)

    //login2(email,password) //로그인 작업 테스트 서버
    login(email,password)  // 로그인 함수에서 받은 데이터 뱐수저장


    res.status(200).json({ message: '로그인성공' });
    // 클라이언트에 응답 전송
    console.log(res.json('message'))
});
function join(email){
    //user,id,pw 값을 localhost:5000/loginpass 로 전송
    // 같은 폴더 안에 userinfo/user/userdata.json을 찾아 pw이 일치하는지 확인후 콘솔에 출력
    console.log(`email: ${email}`)

    // 보낼 데이터
    const data = JSON.stringify({
        email: email,
    });
    
    // 요청 옵션 설정
    const options = {
        hostname: '192.168.0.3',
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
        console.log(`Status Code: ${res.statusCode}`);
    
        res.on('data', (d) => {
            process.stdout.write(d);
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
main.post('/join_pass', (req, res) => {
    // 클라이언트로부터 전송받은 이메일과 비밀번호를 추출
    const { email} = req.body;

    // 서버 콘솔에 이메일과 비밀번호 출력
    //console.log('이메일:', email);
    //console.log('비밀번호:', password);

    // 추가기능 리스트
    // 1.이메일과 테스워드를 확인하고 로그인  
    //console.log(`email: ${email} , pw : ${password} `)

    join(email)

    res.status(200).json({ message: '로그인 정보를 성공적으로 받았습니다.' });
    // 클라이언트에 응답 전송
});
main.get("/buisness", (req, res) => {  // 로그인 으로 인입이 되면 러 
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
main.post('/check', (req, res) => {
    // 클라이언트로부터 전송받은 이메일과 비밀번호를 추출
    const { email} = req.body;
    console.log(req.params)

    // 서버 콘솔에 이메일과 비밀번호 출력
    console.log('이메일:', email);
    //console.log('비밀번호:', password);

    // 추가기능 리스트
    // 1.이메일과 테스워드를 확인하고 로그인  
    //console.log(`email: ${email} , pw : ${password} `)

    

    res.status(200).json({ message: '로그인 정보를 성공적으로 받았습니다.' });
    // 클라이언트에 응답 전송
});
// 서버가동 함수
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
// 사업자 정보 입력 기능
main.post('/buinessinfo', (req, res) => {
    const { buisnessname, buisnesscategory, produnctername, address, info, phonenumber, industnumber, industinfo1, industinfo2 } = req.body;

    const businessInfo = `
        Business Name: ${buisnessname}
        Business Category: ${buisnesscategory}
        Producer Name: ${produnctername}
        Address: ${address}
        Info: ${info}
        Phone Number: ${phonenumber}
        Industry Number: ${industnumber}
        Industry Info 1: ${industinfo1}
        Industry Info 2: ${industinfo2}
    `;
    res.send("문의 내용이 전송 되었습니다")
    //buisness(businessInfo, res);
});
// 사업자 정보 저장 함수
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
// 사업자 정보 입력 기능 (추가 기능인 것으로 보입니다.)
main.post('/sellerinrut', (req, res) => {
    const { sellername, storename, sellerphonenumer, sellerindustinfo1, sellerindustinfo2, storeaddresss } = req.body;

    const sellerInfo = `
        Business Name: ${sellername}
        Store Name: ${storename}
        Seller Phone Number: ${sellerphonenumer}
        Seller Industry Info 1: ${sellerindustinfo1}
        Seller Industry Info 2: ${sellerindustinfo2}
        Store Address: ${storeaddresss}
    `;

    sellerinput(sellerInfo, res);
});
// 사업자 정보 입력 함수
function sellerinput(sellerInfo, res) {
    console.log(sellerInfo);
}
// 서버 가동
main.get("/operation", (req, res) => {  // 로그인 으로 인입이 되면 러 
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

        console.log("프로젝트지원자 페이지 확인")
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
    const directory = path.join('D:', '지원자', operation);

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
            res.status(200).send('데이터가 파일에 성공적으로 저장되었습니다.');
        }
    });
});

// 뷰 설정
main.set("views", "./mainpage")
main.set("view engine", "ejs")
// 홈페이지 라우트
main.get("/eventpage", (req, res) => {
    fs.readFile(__dirname + "/../mainpage/coffeemania_event.html", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }

        // 클라이언트에게 수정된 HTML 전송
        res.send(data);

        console.log("프로젝트지원자 페이지 확인")
    });
});












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

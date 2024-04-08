'use strict';

const express = require('express');
const main = express();
const tamplelate = express();


const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');  // 파일 시스템 모듈 불러오기
const path = require('path');

const serverstart_port = 3001;
const tamplelate_port = 3001;

main.use(express.json());
main.listen(serverstart_port,function(){
    console.log(serverstart_port + "번에서 서버가동") //터미널에 출력
});
main.set("views", "./mainpage");




const database_root = 'F:';


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
main.get("/join", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    fs.readFile(__dirname + "/../mainpage/coffeemania_register.html", 'utf8', (err, data) => {
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
main.get("/tamplelate", (req, res) => {  // 로그인 으로 인입이 되면 러 
    //기능 또는 동작
    //console.log(req.url)
    
    
    fs.readFile(__dirname + "/../mainpage/mainpagetamplete/coffeemainpagetample.html", 'utf8', (err, data) => {
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


main.post('/login_pass', (req, res) => {
    const { email, password } = req.body;
    //console.log('이메일:', email);
    //console.log('비밀번호:', password);
    login_file(email,password);

    getTokenFromUserFile(email, (err, token) => {
        if (err) {
            res.status(200).json({ "token" : 'no_user'});
        } else {
            console.log('토큰:', token);
            res.status(200).json({ "token" : token });
        }
    });

    
});
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

    res.status(200).json({ message: '' }); //이메일 가입 가능 여부 확인 후 가능 여부 전송 
    // 클라이언트에 응답 전송
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
function sellerinput(sellerInfo, res) {
    console.log(sellerInfo);
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
function checkFileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true; // 파일이 존재하는 경우 true 반환
    } catch (err) {
        return false; // 파일이 존재하지 않는 경우 false 반환
    }
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
function login_file(email,pw){
    console.log(`email: ${email}, pw: ${pw}`);

    const loginemail = email;
    const loginpassword = pw;

    const loginfilePath = 'F:' + '/user/' + loginemail + '.json'; // 경로 설정


    // 유저 파일이 존재하는지 확인
    fs.access(loginfilePath, fs.constants.F_OK, (err) => {  //유저가 존재 하는지 확인
        if (err) {
            //console.error(`no_user`);
            // 파일이 존재하지 않을 때의 처리를 여기에 추가합니다.
            return "no_user"
            
        } else {
            console.log(`on_user`);
            // 파일이 존재할 때의 처리를 여기에 추가합니다.
            
            fs.readFile(loginfilePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    console.error('파일 읽기 오류:', readErr);
                    return "error_reading_file";
                }

                let userData = {};
                try {
                    userData = JSON.parse(data);
                } catch (parseError) {
                    console.error('JSON 파싱 오류:', parseError);
                    return "error_parsing_json";
                }

                if (userData.pw === loginpassword) {
                    console.log('패스워드가 일치합니다');
                    // 일치할 때의 처리를 여기에 추가
                    let randomString = generateRandomString(30);
                    console.log(randomString); // 생성된 랜덤 문자열 출력
                    saveTokenToFile(loginemail, randomString); // 생성된 토큰을 파일에 저장
                    return randomString;
                } else {
                    console.log('패스워드가 일치하지 않습니다');
                    return "password_mismatch";
                }
            });

            
        }
    });
}
function join(email) {
    console.log(`email: ${email}`);

    //대기 목록에 있는지 확인
    joinemail_waitcheck(email);
    userfind(email);
    
}



function generateRandomString(length) {//계정 토큰 생성
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 사용할 문자들
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length); // 랜덤 인덱스 생성
        randomString += characters.charAt(randomIndex); // 랜덤 문자열에 추가
    }
    toString(randomString);
    return randomString;
}
function saveTokenToFile(email, token) {//계정 토큰을 저장
    const loginfilePath = path.join('F:', '/user/', `${email}.json`);

    // 이전 파일 데이터를 읽어옴
    fs.readFile(loginfilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일 읽기 오류:', err);
            return;
        }

        let userData = {};
        try {
            // 파일 데이터를 JSON으로 파싱
            userData = JSON.parse(data);
        } catch (parseError) {
            console.error('JSON 파싱 오류:', parseError);
            return;
        }

        // "tocken" 키를 추가하고 값 설정
        userData.token = token;

        // JSON 형식으로 변환하여 파일에 쓰기
        fs.writeFile(loginfilePath, JSON.stringify(userData), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('파일 쓰기 오류:', writeErr);
                return;
            }
            console.log('토큰 저장 완료');
        });
    });
}
function getTokenFromUserFile(loginemail, callback) {
    const loginfilePath = path.join('F:', '/user/', loginemail + '.json');

    fs.readFile(loginfilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일 읽기 오류:', err);
            callback(err, null);
            return;
        }

        let userData = {};
        try {
            userData = JSON.parse(data);
        } catch (parseError) {
            console.error('JSON 파싱 오류:', parseError);
            callback(parseError, null);
            return;
        }

        const token = userData.token;
        if (token) {
            callback(null, token);
        } else {
            console.error('토큰이 유저 파일에 존재하지 않습니다.');
            callback('토큰이 존재하지 않습니다.', null);
        }
    });
}
function joinemail_waitcheck(email){
    // 파일에서 정보 읽어오기
    fs.readFile('F:/waituser/joinwait.json', 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }

        const jsonData = JSON.parse(data); // JSON 데이터 파싱
        const userInfo = jsonData[email]; // 이메일을 키로 사용하여 해당 이메일의 정보 가져오기
        
        if (userInfo) {
            console.log(`User Info: ${JSON.stringify(userInfo)}`);
            // 이제 userInfo 객체를 사용하여 추가적인 작업을 수행할 수 있습니다.
            return "대기 목록에 있음"
        } else {
            console.log('User not found');
            // 이메일에 해당하는 정보가 없는 경우에 대한 처리를 여기에 추가할 수 있습니다.
            return "대기 목록에 있음"
        }
    });
}
function userfind(){
    // 파일이 존재하는지 확인
    const filePath = 'F:/user/'+ +'.json';
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('파일이 존재하지 않습니다.');
        } else {
            console.log('파일이 존재합니다.');
        }
    });
}
function joinemail_waitsave(){
    // 파일이 존재하는지 확인
    const filePath = 'F:/user/'+ +'.json';
    
}

//메인 서버에 이메일 전송
//메인 서버에서 대기 중인 이메일인지 확인
//서브서버 또는 메인 서버에서 가입된 이메일이 있는지 확인 (함수 사용 : userfind)
//없다면 "가입 가능한 아이디 입니다" 전송
//있다면 "이미 존재하는 아이디 입니다" 전송

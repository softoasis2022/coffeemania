'use strict';

const express = require('express');
const main = express();

const fs = require('fs');  // 파일 시스템 모듈 불러오기

const serverstart_port = 3003;

main.use(express.json());

main.listen(serverstart_port, function(){
    console.log(serverstart_port + "번에서 서버가동"); //터미널에 출력
});


function stadarddatabase(jsondata,Time) {
    // 파일에 JSON 데이터 쓰기
    fs.writeFile(`./${Time}/data.json`, jsondata, (err) => {
        if (err) {
            console.error('파일 쓰기 중 오류 발생:', err);
            return;
        }
        console.log('파일이 성공적으로 저장되었습니다.');
    });
}
function CurrentTime() {
    const currentTime = new Date();
    console.log("현재 시간은 " + currentTime.toLocaleString() + "입니다.");
}
const jsondata = '{"key": "value"}'; // JSON 형태의 데이터

let Time = CurrentTime();
stadarddatabase(jsondata,Time);

main.post('/', (req, res) => {
    const data = req.body;
    let Time = CurrentTime();
    stadarddatabase(jsondata,Time);
});
stadarddatabase(jsondata,Time);


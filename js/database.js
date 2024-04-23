'use strict';

const express = require('express');
const main = express();

const fs = require('fs');  // 파일 시스템 모듈 불러오기

const serverstart_port = 3003;

const ref_database = "D:";

main.use(express.json());

main.listen(serverstart_port, function(){
    console.log(serverstart_port + "번에서 서버가동"); //터미널에 출력
});

function CurrentTime() {
    const currentTime = new Date();
    console.log("현재 시간은 " + currentTime.toLocaleString() + "입니다.");
}
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
        
    }
    if (action == "비즈니스") {
        fileName = `${data.marketname}.json`;
        
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


main.post('/', (req, res) => {
    const data = req.body;
    let Time = CurrentTime();
    stadarddatabase(jsondata,Time);
});

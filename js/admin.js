'use strict';

const express = require('express');
const main = express();


const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');  // 파일 시스템 모듈 불러오기
const path = require('path');

const serverstart_port = 3002;

const { exec } = require('child_process');
const { randomBytes } = require('crypto');

const requiredLibraries = ['express', 'cheerio', 'http','fs', 'path'];
lib();

const maxstaff = 1000;

main.use(express.json());
main.listen(serverstart_port,function(){
    console.log(serverstart_port + "번에서 서버가동") //터미널에 출력
});
main.set("views", "./mainpage");

const admintemplatePath = path.join(__dirname, "/../page/adminpage/tamplate/adminpagetamplate.html");

main.get("/", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../page/adminpage/admin/adminmain.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/mainadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../page/adminpage/admin/adminmain.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/marketadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../page/adminpage/admin/adminmarket.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/buisnessadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../page/adminpage/admin/adminbuisness.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/operationadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../page/adminpage/admin/adminoperation.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/selleradmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../page/adminpage/admin/adminseller.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/statisticsadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../page/adminpage/admin/adminstatistics.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});


const ref_database = path.join("D:");
main.post('/operationadmin', (req, res) => {
    const data = req.body;

    if(data.action == "직원등록" || data.action == "지원자등록"){
        staff_input(data);
        res.status(200).json({ message: '전송완료' });
    }
    else{
        const allStaffData = all_staff_find(); //함수에서 전달 받은 데이터를 응답해준다
        res.json(allStaffData);
    }
});
main.post('/operationadmin_mini', (req, res) => {
    const allStaffData = all_staffmini_find(); //함수에서 전달 받은 데이터를 응답해준다
    res.json(allStaffData);
});
function all_staff_find(){
    //직원 정보 파일 경로 : ref_database/staff/부서/부서이름.json
    //json데이터 예시 
    //  [
    //      {"operation" : "개발", "position" : "사원" , "id": 331 , "name" : "서유민" , "phonenumber" : ["010", "4517", "1684"] , "address" : ["충청북도", "퉁주시", "연수동"]},
    //      {"operation" : "개발", "position" : "팀장" , "id": 332 , "name" : "지서은" , "phonenumber" : ["010", "4331", "1102"] , "address" : ["충청북도", "퉁주시", "용산동"]}
    //  ]
    //부서 종류 : 개발, 기획, 디자인, 세무, 영업, 인사
    //1.모든 부서별 직원의 정보를 가져온다
    //2.모든 부서별 직원정보를 하나의 json형태로 모은다
    //3.모은 json을 리턴해준다
    const departments = ["개발", "기획","마케팅", "디자인", "세무", "영업", "인사"];
    let allStaffData = [];

    departments.forEach(department => {
        const departmentFilePath = path.join(ref_database,"company", 'staff', department, department + '.json');
        let departmentData;
        try {
            departmentData = JSON.parse(fs.readFileSync(departmentFilePath, 'utf8'));
            allStaffData = allStaffData.concat(departmentData);
        } catch (error) {
            console.log(`${department}는 지원자가 없습니다`);
        }
    });

    return allStaffData;
}
function all_staffmini_find(){
    //직원 정보 파일 경로 : ref_database/staff/부서/부서이름.json
    //json데이터 예시 
    //  [
    //      {"operation" : "개발", "position" : "사원" , "id": 331 , "name" : "서유민" , "phonenumber" : ["010", "4517", "1684"] , "address" : ["충청북도", "퉁주시", "연수동"]},
    //      {"operation" : "개발", "position" : "팀장" , "id": 332 , "name" : "지서은" , "phonenumber" : ["010", "4331", "1102"] , "address" : ["충청북도", "퉁주시", "용산동"]}
    //  ]
    //부서 종류 : 개발, 기획, 디자인, 세무, 영업, 인사
    //1.모든 부서별 직원의 정보를 가져온다
    //2.모든 부서별 직원정보를 하나의 json형태로 모은다
    //3.모은 json을 리턴해준다
    const departments = ["개발", "기획", "디자인", "세무", "영업", "인사","마케팅"];
    let allStaffData = [];

    departments.forEach(department => {
        const departmentFilePath = path.join(ref_database,"company", '지원자', department + '.json');
        try {
            const departmentData = JSON.parse(fs.readFileSync(departmentFilePath, 'utf8'));
            allStaffData = allStaffData.concat(departmentData);
        } catch (error) {
            console.error(`Error reading file for department ${department} 분야는 없습니다`);
        }
    });

    return allStaffData;
}
function loadTemplate(templatePath) {
    return fs.readFileSync(templatePath, 'utf-8');
}
function loadPage(pagePath) {
    return fs.readFileSync(pagePath, 'utf-8');
}
function applyPageToTemplate(templatePath, pagePath) {
    let template = loadTemplate(templatePath);
    let pageContent = loadPage(pagePath);

    const mainPageRegex = /<div id="admin_info"><\/div>/;
    return template.replace(mainPageRegex, pageContent);
}
function lib(){
    requiredLibraries.forEach(library => {
        exec(`npm install ${library}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error installing ${library}: ${error}`);
                return;
            }
            console.log(`Installed ${library}`);
        });
    });
}

function staff_input(inputdata){
    let departmentFilePath = path.join(ref_database,"company", 'staff', inputdata.operation);
    console.log(inputdata);
    let finddata = all_staff_find();
    let id = displayStaffInfo(finddata);
    if(id > 0){
        inputdata.id = id; 
        console.log(inputdata);
    }
    operation_input_check(departmentFilePath,inputdata);
    
}
function displayStaffInfo(finddata) {
    let result;
    // 특정 id 값을 가진 정보를 찾음
    for(let i = 0 ; i < maxstaff; i++){
        result = findById(finddata, i); // 원하는 id 값을 넣어줌
        console.log(Object.keys(result).length);
        if(Object.keys(result).length == 0){
            return i;
        }
    }
}
function findById(data, idToFind) {
    // 데이터 배열을 순회하면서 id 값이 일치하는 객체들을 찾음
    return data.filter(item => item.id === idToFind);
}

// fetch 후에 호출되는 함수 내에서 사용할 수 있음

function operation_input_check(directoryPath, newData, callback) {
    let fileName = newData.operation + `.json`;
    let filePath = path.join(directoryPath, fileName);
    operation_input(filePath, [newData], (error) => {
        if (error) {
            console.error('Error saving data to file:', error);
        } else {
            console.log('Data saved to file successfully.');
        }
    });
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
function fileExists(filePath) {  //파일이 존재 하는지 알아 보는 함수
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}
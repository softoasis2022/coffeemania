'use strict';

const express = require('express');
const main = express();


const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');  // 파일 시스템 모듈 불러오기
const path = require('path');

const serverstart_port = 3002;

const { exec } = require('child_process');

const requiredLibraries = ['express', 'cheerio', 'http','fs', 'path'];
lib();

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
    const allStaffData = all_staff_find(); //함수에서 전달 받은 데이터를 응답해준다
    console.log(allStaffData);
    res.json(allStaffData);
});
main.post('/operationadmin_mini', (req, res) => {
    const allStaffData = all_staffmini_find(); //함수에서 전달 받은 데이터를 응답해준다
    console.log(allStaffData);
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
    const departments = ["개발", "기획", "디자인", "세무", "영업", "인사"];
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
    const departments = ["개발", "기획", "디자인", "세무", "영업", "인사"];
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
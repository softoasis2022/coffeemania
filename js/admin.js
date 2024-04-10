'use strict';

const express = require('express');
const main = express();


const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');  // 파일 시스템 모듈 불러오기
const path = require('path');

const serverstart_port = 3002;

main.use(express.json());
main.listen(serverstart_port,function(){
    console.log(serverstart_port + "번에서 서버가동") //터미널에 출력
});
main.set("views", "./mainpage");

const admintemplatePath = path.join(__dirname, "/../mainpage/adminpagetamplate/adminpagetamplate.html");
const userdata = "D:/"

main.get("/mainadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../mainpage/admin/coffeemania_admin.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);

    const jsonData = {
        name: "John Doe",
        age: 30
    };
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate).json(jsonData);
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

    const mainPageRegex = /<div id="admin_info"><\/div>/;
    return template.replace(mainPageRegex, pageContent);
}
function finddata(){
    
}
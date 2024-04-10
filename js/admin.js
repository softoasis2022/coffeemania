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


main.get("/", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../mainpage/admin/adminmain.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/mainadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../mainpage/admin/adminmain.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});

main.get("/marketadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../mainpage/admin/adminmarket.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});

main.get("/buisnessadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../mainpage/admin/adminbuisness.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/operationadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../mainpage/admin/adminoperation.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/selleradmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../mainpage/admin/adminseller.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});
main.get("/statisticsadmin", (req, res) => {
    // 탬플릿 안에 넣을 페이지 html파일 경로
    const pagePath = path.join(__dirname, "/../mainpage/admin/adminstatistics.html");

    // 페이지 내용을 템플릿에 적용하여 렌더링
    let renderedTemplate = applyPageToTemplate(admintemplatePath, pagePath);
    // 렌더링된 템플릿을 클라이언트에게 응답
    res.send(renderedTemplate);
});

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

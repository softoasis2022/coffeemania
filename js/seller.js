'use strict';

const express = require('express');
const main = express();
const path = require('path');
const fs = require('fs');

const serverstart_port = 3400;

main.use(express.json());
main.listen(serverstart_port, () => {
    console.log(serverstart_port + "번에서 서버가동"); //터미널에 출력
});

main.set("views", "./mainpage");
const sellertemplatePath = path.join(__dirname, "/../page/sellerpage/tamplate/sellerpagetamplate.html");
const ref_database = "D:";
const ref_database_root = 'company';
const ref_database_user = 'sellerlogin';

main.get("/", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/mainpage/main/coffeemania.html");
    let renderedTemplate = applyPageToTemplate(sellertemplatePath, pagePath);
    res.send(renderedTemplate);
});
main.get("/seller", (req, res) => {
    //토큰을 받으면 페이지에 셀러이름 섞어서 응답 
    const token = req.query.token; // 예시: 요청에서 토큰을 쿼리 매개변수로 받음
    if(token > ""){ //토큰이 있는 경우
        const pagePath = path.join(__dirname, "/../page/sellerpage/seller/sellerpage.html");
        let renderedTemplate = applyPageToTemplate(sellertemplatePath, pagePath);
        let loginfilepass = path.join(ref_database, "database" , ref_database_user, `${token}.json`);
        let loginfind = JSON.parse(fs.readFileSync(loginfilepass, 'utf-8'));
        console.log(loginfind['marketname']);
        renderedTemplate = renderedTemplate.replace(`<title id="companyname">회사이름</title>`, `<title id="companyname">${loginfind['marketname']}</title>`);
        res.send(renderedTemplate);
    }
    else {
        const pagePath = path.join(__dirname, "/../page/sellerpage/seller/sellerpage.html");
        let renderedTemplate = applyPageToTemplate(sellertemplatePath, pagePath);
        res.send(renderedTemplate);
    }
    
});
main.get("/sellerlogin", (req, res) => {
    const pagePath = path.join(__dirname, "/../page/sellerpage/seller/sellerlogin.html");
    let renderedTemplate = loadPage(pagePath);
    res.send(renderedTemplate);
});
main.post('/seller_login_pass', (req, res) => {
    const { email, password } = req.body;
    const loginfilePath = `D:/database/user/${email}.json`;
    let login = login_pass(loginfilePath,email,password);
    console.log(login["token"]);
    res.status(200).json({token : login["token"]});
    
});


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function applyPageToTemplate(templatePath, pagePath) {
    let template = loadTemplate(templatePath);
    let pageContent = loadPage(pagePath);
    const mainPageRegex = /<div id="mainpage"><\/div>/;
    return template.replace(mainPageRegex, `<div id="mainpage">${pageContent}</div>`);
}
function loadTemplate(templatePath) {
    return fs.readFileSync(templatePath, 'utf-8');
}
function loadPage(pagePath) {
    return fs.readFileSync(pagePath, 'utf-8');
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function login_pass(loginfilePath,email,password){
    let loginfind= "";
    loginfind = fs.readFileSync(loginfilePath, 'utf-8');
    //console.log(JSON.parse(loginfind)["pw"]);
    //console.log(password);
    if(JSON.parse(loginfind)["pw"] == password){
        path.join(ref_database, ref_database_user, );
        return JSON.parse(loginfind)
    }
}

function getDirectoryPath(action,data) { //action 유입에 따라 파일경로를 전달
    
    switch (action) {
        case "상품등록":
            return path.join(ref_database, ref_database_root,'action');
        default:
            console.error("Invalid action:", action);
            return null;
    }
}
function productinput(){
    
}
function findmarket(token){
    console.log(token);
    return token;
}
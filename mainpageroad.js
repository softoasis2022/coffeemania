<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>커피메니아 인재 채용 및 프리렌서 모집</title>
    <style>
        #mian_logo_page{
            width: 100%;
            height: 80px;
            background-color: pink;
        }
        #main_first_top{
            width: 100%;
            height: auto;
            display:flex;
        }
        #company_info{
            width: 100%;
            height: 500px;
            background-color: pink;
        }
    </style>
        <style>
            #operation_page_main_info{
                width: fit-content;
                height: fit-content;
                margin: 50px;
            }
            #operation_page_main_info_li{
                margin-top: 30px;
                margin-bottom: 30px;
            }
            #operation_ul{
                list-style: none;
                height: fit-content;
            }
            #operation_li{
                width: fit-content;
                height: fit-content;
                border: 2px solid black;
                margin-top: 10px;
                padding: 10px;
            }
            #operation_info_ul{
                list-style: none;
                height: fit-content;
                padding: 0px;
            }
            #operation_info_li{
                width: 1000px;
                height: fit-content;
                padding: 20px;
            }
            #operation_info{
                width: 100%;
            }
            #operation_info_view{
                display: flex;
    
            }
            #operation_info_li_main{
                display: flex;
            }
            #operation_input{
                width: 100%;
                height: fit-content;
                border: 1px solid black;
            }
        </style>
    <script>
        let page_info = document.getElementById("psgeinfo")

        page_info.insertAdjacentHTML(``)
    </script>
</head>
<body>
    <div id="mian_logo_page">
        <style>
            #mian_logo_page_left{
                width: 85%;
                float: left;
                text-align: center;
            }
            #mian_logo_page_right{
                width: 15%;
                float: left;
                text-align: center;
            }
        </style>
        <div id="mian_logo_page_left">
            <a id="btn_login_page_move" onclick="location.href='coffeemania.html'">
                커피매니아
            </a>
        </div>
        <div id="mian_logo_page_right">
            <a id="btn_login_page_move" onclick="location.href='coffeemania_login.html'">
                로그인
            </a>
        </div>
    </div>
    <div id="main_first_top">
        <style>
            
            #main_first_top_ui{
            list-style: none;
            text-align: center;
            width: 100%;
            height: min-content;
            }
            #main_first_top_li{
                float: left;
                width: 150px;
                height: min-content;
            }
            #main_first_top > ul > li :hover > ul{
            display: block;
            }
            #main_first_top_sub_ul{
                list-style: none;
                text-align: center;
                width: auto;
                height: auto;
                display: none;
            }
            #main_first_top_sub_li{
                width: min-content;
                height: min-content;
            }
        </style>
        <ul id="main_first_top_ui">
            <li id="main_first_top_li">
                커핑 이야기
                <ul id="main_first_top_sub_ul">
                    <li class="main_first_top_sub_li">
                        브랜드 스토리
                    </li>
                    <li class="main_first_top_sub_li">
                        위치
                    </li>
                    <li class="main_first_top_sub_li">
                        바리스타
                    </li>
                    <li class="main_first_top_sub_li">
                        
                    </li>
                    <li class="main_first_top_sub_li">
                        
                    </li>
                </ul>
            <li id="main_first_top_li">
                커피
                <ul id="main_first_top_sub_ul">
                    <li>
                        생두
                    </li>
                    <li>
                        원두
                    </li>
                    <li>
                        시럽
                    </li>
                    <li>
                        티
                    </li>
                </ul>
            </li>
            <li id="main_first_top_li">
                악세서리
            </li>
            <li id="main_first_top_li">
                <div onclick="location.href='/buisness'">
                    프로젝트 참여
                </div>
            </li>
            <li id="main_first_top_li">
                <a onclick="location.href='/eventpage'">
                    EVENT
                </a>
            </li>
            <li id="main_first_top_li">
                <div onclick="location.href='/operation'">
                    프로젝트 참여
                </div>
            </li>
        </ul>
    </div>
    <div id="operation_page_main_info">
        <div id="operation_page_main_info_li">
            <div>
                프로젝트 형식
            </div>
            <div>
                포트폴리오용 프로젝트, 수익형 프로젝트
            </div>
        </div>
        <div id="operation_page_main_info_li">
            <div>
                프로젝트 간단 설명
            </div>
            <div>
                홈카페 관련 제품을 판매하는 쇼핑몰입니다.  일반적인 프렌차이즈에서 판매 하는 프랜치커피가 아닌 스페셜티에 속하는 커피를 프렌치 커피 가격으로 더욱 맛있는 커피르 즐길수있다는 모티브로 시작하게 되었습니다.  본 프로젝트는 포트폴리오 뿐만아니라 채용에도 고려 해볼 수있는 프로젝트입니다. 이미 사업자 등록은  완료한 상태이며 상장이후 지분을 참여하신분들에게 집누 2%식 나누어 드릴예정입니다. 또한 오픔이후 매출 1천만원 이상이 나온다면 5프로씩 지급 해 드릴 예정입니다.
            </div>
        </div>
        <div id="operation_page_main_info_li">
            <div>
                주요 참여 시간
            </div>
            <div>
                없음, 각 부서별 회의를제외 하고는 고정 시간이 부여 되지 않습니다.
            </div>
        </div>
        <div id="operation_page_main_info_li">
            <div>
                신청방법
            </div>
            <div>
                hang05312@softoasis,org로 포트폴리오 및 이력서 발송
            </div>
        </div>
        <div id="operation_page_main_info_li">
            <div>
                수익배분 방법
            </div>
            <div>
                <p>
                    a. 순매출 1000만원 이상 달성시 순매출에 5% 지급
                </p>
                <p>
                    b. 상장시 회사 지분에 2% 지급
                </p>
                <p>
                    c. 원하신 다면 직원 채용
                </p>
            </div>
        </div>
        <div id="operation_page_main_info_li">
            <div>
                오픈 예정일
            </div>
            <div>
                24년 하반기
            </div>
        </div>
        <div id="operation_page_main_info_li">
            <div>
                문의사항
            </div>
            <div>
                <a href="https://open.kakao.com/o/sxTCML7f" >카카오톡 오픈채팅</a>
            </div>
        </div>
    </div>
    <div>
        <ul id="operation_ul">
            <li id="operation_li">
                <ul id="operation_info_ul">
                    <style>
                        #operation_info_li{
                                border: 1px solid black;
                                margin-top: 10px;
                            }
                    </style>
                    <div id="operation_info_view">
                        <div>개발</div>
                        <div>
                            <button id="btn_operation_info_plus" onclick="operationinfoplus()">
                                더보기
                            </button>
                        </div>
                    </div>
                    <li id="operation_info_li">
                        <style>
                            #title{
                                padding: 10px;
                            }
                            #operation_info_li_main{
                                padding: 20px;
                            }
                        </style>
                        <div id="operation_info">
                            <div id="title">크롤링 및 데이터 관리 가능 하신분</div>
                            <div id="operation_info_li_main">
                                <style>
                                    #sub1{
                                        margin-right: 10px;
                                    }
                                </style>
                                <div id="sub1">
                                    필요 기술
                                </div>
                                <div id="sub2">
                                    파이썬 크롤링 경헙자
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <script>
                        function operationinfoplus(){
                            alert('더보기 클릭')
                        }
                    </script>
                </ul>
            </li>
            <li id="operation_li">
                <ul id="operation_info_ul">
                    <div id="operation_info_view">
                        <div id="opername">디자인</div>
                        <div>
                            <button id="btn_operation_info_plus" onclick="operationinfoplus()">
                                더보기
                            </button>
                        </div>
                    </div>
                    <li id="operation_info_li">
                        <div id="operation_info">
                            <div>웹디자이너 모집</div>
                            <div>
                                <div>
                                    필요기술
                                </div>
                                <div>
                                    일러스트레이터, 포토샵, XD, 이펙트ㄴ
                                </div>
                            </div>
                        </div>
                    </li>
                    <script>
                        function operationinfoplus(){
                            alert('더보기 클릭')
                        }
                    </script>
                </ul>
            </li>
            <li id="operation_li">
                <ul id="operation_info_ul">
                    <div id="operation_info_view">
                        <div id="opername">기획</div>
                        <div>
                            <button id="btn_operation_info_plus" onclick="operationinfoplus()">
                                더보기
                            </button>
                        </div>
                    </div>
                    <li id="operation_info_li">
                        <div id="operation_info">
                            <div id="title">PM , PO 모집</div>
                            <div id="technology"></div>
                        </div>
                    </li>
                    <script>
                        function operationinfoplus(){
                            alert('더보기 클릭')
                        }
                    </script>
                </ul>
            </li>
            <li id="operation_li">
                <ul id="operation_info_ul">
                    <div id="operation_info_view">
                        <div id="opername">세무</div>
                        <div>
                            <button id="btn_operation_info_plus" onclick="operationinfoplus()">
                                더보기
                            </button>
                        </div>
                    </div>
                    <li id="operation_info_li">
                        <div id="operation_info">
                            <div>웹디자이너 모집</div>
                            <div></div>
                        </div>
                    </li>
                    <script>
                        function operationinfoplus(){
                            alert('더보기 클릭')
                        }
                    </script>
                </ul>
            </li>
            <li id="operation_li">
                <ul id="operation_info_ul">
                    <div id="operation_info_view">
                        <div id="opername">인사</div>
                        <div>
                            <button id="btn_operation_info_plus" onclick="operationinfoplus()">
                                더보기
                            </button>
                        </div>
                    </div>
                    <li id="operation_info_li">
                        <div id="operation_info">
                            <div>웹디자이너 모집</div>
                            <div></div>
                        </div>
                    </li>
                    <script>
                        function operationinfoplus(){
                            alert('더보기 클릭')
                        }
                    </script>
                </ul>
            </li>
            <li id="operation_li">
                <ul id="operation_info_ul">
                    <div id="operation_info_view">
                        <div id="opername">영업</div>
                        <div>
                            <button id="btn_operation_info_plus" onclick="operationinfoplus()">
                                더보기
                            </button>
                        </div>
                    </div>
                    <li id="operation_info_li">
                        <div id="operation_info">
                            <div>웹디자이너 모집</div>
                            <div></div>
                        </div>
                    </li>
                    <script>
                        function operationinfoplus(){
                            alert('더보기 클릭')
                        }
                    </script>
                </ul>
            </li>
            <li id="operation_li">
                <ul id="operation_info_ul">
                    <div id="operation_info_view">
                        <div id="opername">마케팅</div>
                        <div>
                            <button id="btn_operation_info_plus" onclick="operationinfoplus()">
                                더보기
                            </button>
                        </div>
                    </div>
                    <li id="operation_info_li">
                        <div style="width: 1000px; height: fit-content;">
                            <div id="operation_info">
                                <div>웹디자이너 모집</div>
                                <div></div>
                            </div>
                        </div>
                    </li>
                    <script>
                        function operationinfoplus(){
                            alert('더보기 클릭')
                        }
                    </script>
                </ul>
            </li>
            <li id="operation_li">
                <ul id="operation_info_ul">
                    <div id="operation_info_view">
                        <div id="opername">바리스타</div>
                        <div>
                            <button id="btn_operation_info_plus" onclick="operationinfoplus()">
                                더보기
                            </button>
                        </div>
                    </div>
                    <li id="operation_info_li">
                        <div style="width: 1000px; height: fit-content;">
                            <div id="operation_info">
                                <div>웹디자이너 모집</div>
                                <div></div>
                            </div>
                        </div>
                    </li>
                    <script>
                        function operationinfoplus(){
                            alert('더보기 클릭')
                        }
                    </script>
                </ul>
            </li>
            <li id="operation_li">
                <ul id="operation_info_ul">
                    <div id="operation_info_view">
                        <div id="opername">로스터</div>
                        <div>
                            <button id="btn_operation_info_plus" onclick="operationinfoplus()">
                                더보기
                            </button>
                        </div>
                    </div>
                    <li id="operation_info_li">
                        <div style="width: 1000px; height: fit-content;">
                            <div id="operation_info">
                                <div>웹디자이너 모집</div>
                                <div></div>
                            </div>
                        </div>
                    </li>
                    <script>
                        function operationinfoplus(){
                            alert('더보기 클릭')
                        }
                    </script>
                </ul>
            </li>
        </ul>
    </div>
    <div id="operation_input">
        <style>
            #operation_input_sub{
                display: flex;
                width: 100%;
                height: fit-content;
                border-bottom: 1px solid black;
            }
            #operation_input_sub_main{
                width: fit-content;
                height: fit-content;
                
            }
        </style>
        <div style="border-bottom: 1px solid black;">
            <p style="font-size: 25px; margin: 10px;">
                프로 젝트 지원
            </p>
        </div>
        <div id="operation_input_sub">
            <div id="operation_input_sub_main">
                <p style="width: 150px; margin-left: 50px;">
                    이름
                </p>
            </div>
            <div id="operation_input_sub_main">
                <input id="name" style="width: 500px; height: 30px; font-size: 15px; text-align: left; margin-top: 10px;" maxlength="4" value="실명을 입력해주세요 최대 4글자" onclick="value=``">
            </div>
        </div>
        <div id="operation_input_sub">
            <div id="operation_input_sub_main">
                <p style="width: 150px; margin-left: 50px;">
                    활동 닉네임
                </p>
            </div>
            <div id="operation_input_sub_main">
                <input id="nickname" style="width: 500px; height: 30px; font-size: 15px; text-align: left; margin-top: 10px;" value="영어 일경우 한글도 입력해 주세요 EX. lape`(라페)`" onclick="value=``">
                <script>

                </script>
            </div>
        </div>
        <div id="operation_input_sub">
            <div id="operation_input_sub_main">
                <p style="width: 150px; margin-left: 50px;">
                    지원 부서
                </p>
            </div>
            <div id="operation_input_sub_main" style="display: flex; ">
                <input id="infomation" style="width: 500px; height: 30px; font-size: 15px; text-align: left; margin-top: 10px;" maxlength="10" value="지원 하는 부서를 입력해 주세요" onclick="value=``">
                <div style="width: 30px; height: 30px; margin-top: 10px; margin-left: 10px; border: 1px solid black; text-align: center;" onclick="infomation_sellect()">
                     더
                     <style>
                        #pl_li{
                            border: 1px solid black;
                            width: 80px;
                            height: fit-content;
                        }
                     </style>
                     <ul id="pl" style="display: none; list-style: none;">
                        <li id="pl_li"  onclick="infomation_sellect_on(this.textContent)">개발</li>
                        <li id="pl_li" onclick="infomation_sellect_on(this.textContent)">디자인</li>
                        <li id="pl_li" onclick="infomation_sellect_on(this.textContent)">기획</li>
                        <li id="pl_li" onclick="infomation_sellect_on(this.textContent)">세무</li>
                        <li id="pl_li" onclick="infomation_sellect_on(this.textContent)">인사</li>
                        <li id="pl_li" onclick="infomation_sellect_on(this.textContent)">영업</li>
                        <li id="pl_li" onclick="infomation_sellect_on(this.textContent)">마케팅</li>
                        <li id="pl_li" onclick="infomation_sellect_on(this.textContent)">바리스타</li>
                        <li id="pl_li" onclick="infomation_sellect_on(this.textContent)">로스터</li>
                     </ul>
                </div>
                <script>
                    function infomation_sellect(){
                        pls = document.getElementById('pl');
                        if(pls.style.display == 'block'){
                            pls.style.display = 'none';
                        }
                        else{
                            pls.style.display = 'block';
                        }
                    }
                    function infomation_sellect_on(oper){
                        console.log(oper);
                        document.getElementById("infomation").value= oper;
                    }
                </script>
            </div>
        </div>
        <div id="operation_input_sub">
            <div id="operation_input_sub_main">
                <p style="width: 150px; margin-left: 50px;">
                    전화 번호
                </p>
            </div>
            <div id="operation_input_sub_main">
                <input id="phonenumber1" style="width: 100px; height: 30px; font-size: 15px; text-align: left; margin-top: 10px;" maxlength="3" value="010" onclick="value=``">
            </div>
            <div id="operation_input_sub_main" style="margin-left: 30px;">
                <input id="phonenumber2" style="width: 100px; height: 30px; font-size: 15px; text-align: left; margin-top: 10px;" maxlength="4" value="0000" onclick="value=``">
            </div>
            <div id="operation_input_sub_main" style="margin-left: 30px;">
                <input id="phonenumber3" style="width: 100px; height: 30px; font-size: 15px; text-align: left; margin-top: 10px;" maxlength="4" value="0000" onclick="value=``">
            </div>
        </div>
        <div style="border-bottom: 1px solid black;">
            <div id="operation_input_sub_main"  style="width: 100%;">
                <p style="width: 150px; margin-left: 50px;">
                    포트폴리오
                </p>
            </div>
            <div id="operation_input_sub_main_sub" style="margin: 10px;">
                <div id="portpolio_input">
                    <p></p>
                    <input id="platform" style="width: 150px; height: 30px; font-size: 15px; text-align: left; margin-top: 10px; margin-left: 50px;" value="플렛폼 ex.깃허브" onclick="value=``">
                    <input id="link" style="width: 300px; height: 30px; font-size: 15px; text-align: left; margin-top: 10px; margin-left: 30px;" value="LINK" onclick="value=''">
                    <button onclick="portpoliolink_plus()">항목 추가</button>
                </div>
            </div>
            <script>
                function portpoliolink_plus(){
                    // 새로운 div 요소 생성
                    var newDiv = document.createElement("div");
                    newDiv.id = "portpolio_input";

                    // 새로운 input 요소 생성 (width: 150px)
                    var input1 = document.createElement("input");
                    input1.id = "platform";
                    input1.style.width = "150px";
                    input1.style.height = "30px";
                    input1.style.fontSize = "15px";
                    input1.style.textAlign = "left";
                    input1.style.marginTop = "10px";
                    input1.style.marginLeft = "50px";
                    input1.value = "플렛폼 ex.깃허브";
                    input1.onclick = function() { this.value = ""; };

                    // 새로운 input 요소 생성 (width: 300px)
                    var input2 = document.createElement("input");
                    input2.id = "link";
                    input2.style.width = "300px";
                    input2.style.height = "30px";
                    input2.style.fontSize = "15px";
                    input2.style.textAlign = "left";
                    input2.style.marginTop = "10px";
                    input2.style.marginLeft = "35px";
                    input2.value = "LINK";
                    input2.onclick = function() { this.value = ""; };

                    // "항목 추가" 버튼 생성
                    var button = document.createElement("button");
                    button.textContent = "항목 추가";
                    button.onclick = portpoliolink_plus;
                    button.style.marginLeft = "6px";

                    // div 요소에 input 요소와 버튼 추가
                    newDiv.appendChild(input1);
                    newDiv.appendChild(input2);
                    newDiv.appendChild(button);

                    // operation_input_sub_main 요소에 새로운 div 요소 추가
                    document.getElementById("operation_input_sub_main_sub").appendChild(newDiv);
                }
                
            </script>
        </div>
        <div style="width: 100%; width: 1000px; height: fit-content; padding: 20px; text-align: center;">
            <a>
                <button id="btn_operation_api" style="width: 500px; height: 50px;" onclick="operationdata_input()">지원 하기</button>
            </a>
            <script>
                function operationdata_input(){
                    console.log('로그인버튼클릭 이벤트');
                    const operation_input_name = document.getElementById('name').value; // 아이디에 해장 하는 테그를 찾아 value값을 찾는다
                    const operation_input_nickname = document.getElementById('nickname').value;
                    const operation_input_infomation = document.getElementById('infomation').value;
                    const operation_input_phonenumber1 = document.getElementById('phonenumber1').value;
                    const operation_input_phonenumber2 = document.getElementById('phonenumber2').value;
                    const operation_input_phonenumber3 = document.getElementById('phonenumber3').value;
                    // 추가 안된 항목 : 포트폴리오 항목
                    
                    fetch('http://www.coffeemanias.com:3001/operation', {
                        method: 'POST', // POST 요청을 사용
                        headers: {'Content-Type': 'application/json' // 요청의 본문이 JSON 형태임을 명시
                        },
                        body: JSON.stringify({
                            name : operation_input_name, // 지원자 이름 데이터
                            nickname : operation_input_nickname, // 지원자 이름 데이터
                            operation : operation_input_infomation, // 지원자 이름 데이터
                            phonenumber1 : operation_input_phonenumber1, // 지원자 이름 데이터
                            phonenumber2 : operation_input_phonenumber2, // 지원자 이름 데이터
                            phonenumber3 : operation_input_phonenumber3, // 지원자 이름 데이터
                        })
                        })
                        .then(response => response.json()) // 서버로부터의 응답을 JSON 형태로 파싱
                        .then(data => {
                            console.log(data); // 응답 결과를 콘솔에 출력
                            if (data.message === '지원완료') {
                                // 메시지가 '로그인 정보를 성공적으로 받았습니다.' 일 때, 페이지를 이동
                                window.location.href = 'http://www.coffeemanias.com:3001/';
                            }
                            if(data.message === '지원 실패'){
                                console.log('지원 실패');
                            }
                        })
                        .catch(error => console.error('Error:', error)); // 에러가 발생한 경우 콘솔에 에러를 출력
                }
            </script>
        </div>
    </div>
    <div id="company_info">
        <style>
            #company_info_sub{
                width: 30%;
                height: 100%;
                float: left;
                background-color: pink;
            }
        </style>
        <div id="company_info_sub">
            <div id="ADDRESS">
                <p style="font-size: x-large; margin: 0;">
                    ADDRESS
                </p>
                <p style="font-size:small; margin: 0">
                    대전광역시 대덕대로 223 대우토피아 1415호
                </p>
            </div>
            <div>
                <p style="font-size: x-large;">
                    고객센터
                </p>
                <p style="font-size:medium;">
                    010-4517-1684
                </p>
                <p style="font-size:medium;">
                    상담 운영 시간 : 월 ~ 금    AM 09 : 00 ~ PM 18 : 00 
                </p>
            </div>
            <div>
                <p style="font-size: x-large;">
                    SNS
                </p>
                <a href="https://www.instagram.com/life_para3/">
                    <img src="insta.jpg" style="width: 40px; height: 40px; margin: 6px;">
                </a>
                <a href="https://www.facebook.com/profile.php?id=61552411303231">
                    <img src="facebook.jpg" style="width: 40px; height: 40px; margin: 6px;">
                </a>
                <a href="https://open.kakao.com/o/sxTCML7f">
                    <img src="kakao.jpg" style="width: 40px; height: 40px; margin: 6px;">
                </a>
                <p>
                    네이버 블로그
                </p>
            </div>
        </div>
        <div id="company_info_sub">
            <style>
                #notice{
                    width: 100%;
                    height: 200px;
                }
            </style>
            <div id="notice">
                <div style="width: 100%; height: 60px;">
                    <div style="width: 75%; height: 100%; float: left;" >
                        <p style="font-size: large;">
                            공지사항
                        </p>
                    </div>
                    <div style="width: 25%; height: 100%; float: left;">
                        <p style="font-size: small;"> 
                            더보기 +
                        </p>
                    </div>
                </div>
                <div style="padding: 0; margin: 0 ;">
                    <style>
                        #notice_info_ul{
                            list-style: none;
                            margin: 0;
                            margin-block-end: 0px;
                            margin-block-start: 0px;
                            padding-inline-start: 0px
                        }
                    </style>
                    <ul id="notice_info_ul">
                        <style>
                            #notice_info_li{
                                margin-left: 0;
                                font-size: small;
                                margin: 6px;
                            }

                        </style>
                        <li id="notice_info_li" >
                            1. 
                            <a id="notice_info_link">
                                공지1
                            </a>
                        </li>
                        <li id="notice_info_li">
                            2. 
                            <a id="notice_info_link">
                                공지2
                            </a>
                        </li>
                        <li id="notice_info_li">
                            3. 
                            <a id="notice_info_link">
                                공지3
                            </a>
                        </li>
                        <li id="notice_info_li">
                            4. 
                            <a id="notice_info_link">
                                공지4
                            </a>
                        </li>
                        <li id="notice_info_li">
                            5. 
                            <a id="notice_info_link">
                                공지5
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="company_info_sub">
            <div>
                <p>
                    buisness 문의
                </p>
                <a href="https://open.kakao.com/o/grwHIL7f">
                    <img src="kakao.jpg" style="width: 40px; height: 40px;">
                </a>
            </div>
            <div>
                <p>
                    테스트 스페이스
                </p>
                <div style="width: 100px; height: 100px; background-color: black;" onclick="location.href='coffeemania_pay.html'">
                    
                </div>
            </div>
        </div>
    </div>
</body>
</html>

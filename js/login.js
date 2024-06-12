const check_xss = (input) => {
    const DOMPurify = window.DOMPurify;
    const sanitizedInput = DOMPurify.sanitize(input);
    if (sanitizedInput !== input) {
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
    return sanitizedInput;
};
function login_count() {
    let loginCnt = getCookie("login_cnt") || 0; // 기존 쿠키 값 가져오기, 없으면 0으로 초기화
    loginCnt++; // 카운트 증가
    setCookie("login_cnt", loginCnt, 365); // 증가된 카운트를 쿠키에 저장, 365일 동안 유지
    alert("로그인 횟수: " + loginCnt);
}

function logout_count() {
    let logoutCnt = getCookie("logout_cnt") || 0; // 기존 쿠키 값 가져오기, 없으면 0으로 초기화
    logoutCnt++; // 카운트 증가
    setCookie("logout_cnt", logoutCnt, 365); // 증가된 카운트를 쿠키에 저장, 365일 동안 유지
    alert("로그아웃 횟수: " + logoutCnt);
}


const check_input = () => {
    const idsave_check = document.getElementById('idSaveCheck');
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');

    const c = '아이디, 패스워드를 체크합니다';
    alert(c);
    
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue === '') {
        alert('이메일을 입력하세요.');
        return false;
    }

    if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        return false;
    }
    
    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
    }
    
    if (passwordValue.length < 12) {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        return false;
    }
    
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    

    const sanitizedPassword = check_xss(passwordValue);
    const sanitizedEmail = check_xss(emailValue);
    if (!sanitizedEmail || !sanitizedPassword) {
        return false;
    }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);

    if (idsave_check.checked) {
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    } else {
        setCookie("id", emailValue.value, 0); // 날짜를 0 - 쿠키 삭제
    }
    
    session_set(); // 세션 생성
    loginForm.submit();
};

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");
    if(get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check(); // 세션 유무 검사
}

function logout(){
    session_del(); // 세션 삭제
    location.href='../index.html';
}

function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb; 
    console.log(eb); 
}

function init_logined(){
    if(sessionStorage){
        // 세션이 존재하는지 확인
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function addJavascript(jsname) { // 자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
}

addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login_btn").addEventListener('click', check_input);
});

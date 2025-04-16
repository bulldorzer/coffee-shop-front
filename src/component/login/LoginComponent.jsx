import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/login/LoginComponent.css";


/**
 * 로그인 컴포넌트 - 나영일 (토큰 주석 나중에 제거)
 * @returns 
 */

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        const savedEmail = localStorage.getItem("savedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8081/api/members/login", { email, pw });
            console.log("서버 응답:", response);  
            const { accessToken } = response.data;

            // // JWT 토큰 저장 (예: localStorage)
            localStorage.setItem("accessToken", accessToken);

            // '아이디 저장' 체크되었을 때만 저장
            if (document.getElementById("saveId").checked) {
                localStorage.setItem("savedEmail", email);
            } else {
                localStorage.removeItem("savedEmail");
            }

            // 에러 해제
            setError(false);

            // 로그인 성공 후 페이지 이동
            navigate("/"); // 또는 원하는 페이지
        } catch (err) {
            console.error("로그인 실패", err);
            setError(true);
        }
    };

    const handleKeyPress = (e) => {
        // 엔터 키로 로그인 가능
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className="login-wrapper">
            <h1 className="login-title">로그인</h1>
            <div className="login-inputs">
                <input
                    type="text"
                    placeholder="아이디"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="login-input"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>

            {error && (
                <div className="login-error">
                    ※ 아이디 / 비밀번호가 일치하지 않습니다.
                </div>
            )}

            <div className="login-check">
                <input type="checkbox" id="saveId" />
                <label htmlFor="saveId">아이디 저장</label>
            </div>

            <button className="login-button" onClick={handleLogin}>로그인</button>
            <button className="kakao-button">카카오 아이디로 로그인</button>

            <div className="login-links">
                <button>아이디 찾기</button> | 
                <button>비밀번호 찾기</button> | 
                <Link to="/join/agree">회원가입</Link>
            </div>
        </div>
    );
};

export default LoginComponent;
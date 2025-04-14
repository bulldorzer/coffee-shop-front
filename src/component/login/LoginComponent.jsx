import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../css/login/LoginComponent.css";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("/api/member/login", { email, pw });

            // const { accessToken } = response.data;

            // // JWT 토큰 저장 (예: localStorage)
            // localStorage.setItem("accessToken", accessToken);

            // 에러 해제
            setError(false);

            // 로그인 성공 후 페이지 이동
            navigate("/"); // 또는 원하는 페이지
        } catch (err) {
            console.error("로그인 실패", err);
            setError(true);
        }
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
import { Link } from "react-router-dom" 

/**
 * 로그인 화면 - 나영일
 * @returns 
 */

const LoginPage = () => {


    return (
        <div>
            <div className="container"> 
                <h1>로그인</h1>                 
                <div className="login_box">
                    <div>
                        <input placeholder="아이디" type="text"/>
                        <input placeholder="비밀번호" type="password"/>
                    </div>
                    <button>로그인</button>
                </div>
                <h6>※ 아이디 / 비밀번호가 일치하지 않습니다.</h6>           {/* 나중에 수정 -> 아이디/비밀번호가 일치하지 않을 때만 표시 */}
                <input type="checkbox"/><label>아이디 저장</label><br/>
                <button>카카오 아이디로 로그인</button>                     {/* 나중에 수정 -> 카카오 소셜로그인 구현 */}
                <div>
                    <ul>
                        <li><button>아이디 찾기</button></li>
                        <li><button>비밀번호 찾기</button></li>
                        <li><Link to="/join/agree">회원가입</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
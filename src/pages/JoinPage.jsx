import { Link } from "react-router-dom" 
import BasicLayout from "../layouts/BasicLayout";

/**
 * 회원가입 화면 2 : 정보 입력 - 나영일
 * @returns 
 */

const JoinPage = () => {

    return (
        <BasicLayout>
            <div>
                <div>
                    <h1>회원가입</h1>
                    <span>01 약관동의 &gt;</span>   {/* &gt; = '>' 기호 표시 */}
                    <span>02 정보입력</span>
                    <hr/>
                </div>
                <div>
                    <h2>정보 입력</h2>
                    <span>* 표시는 반드시 입력하셔야 하는 항목입니다.</span>
                    <hr/>
                    <label>* 이메일ID</label><input/>
                    <span>@</span>
                    <select>
                        <option>직접입력</option>                             {/* 나중에 수정 : 직접 입력 가능하도록 */} 
                        <option value="naver.com">naver.com</option>  
                        <option value="gmail.com">gmail.com</option>  
                        <option value="gmail.com">hanmail.net</option>  
                        <option value="gmail.com">daum.net</option>  
                        <option value="gmail.com">nate.com</option>  
                    </select><br/>
                    <label>* 비밀번호</label><input/><br/>
                    <label>* 비밀번호 확인</label><input/><br/>
                    <label>* 이름</label><input/><br/>
                    <label>* 휴대폰 번호</label><input/><br/>
                    <label>* 주소</label><input/><button>우편번호 검색</button><br/>            {/* 나중에 수정 : 주소 API 사용 */} 
                    <label>* 상세 주소</label><input/><br/>
                    <input type="checkbox"/><label>정보/이벤트 수신에 동의합니다.</label><br/>
                    <Link to="/join/agree">이전단계</Link>
                    <Link to="/login">회원가입</Link>             {/* 나중에 수정 : 회원가입 시 Member로 입력받은 회원 데이터 보내기 (모든 항목 입력해야 함.) + 회원가입 완료 페이지를 만들거나 알림을 할 것 */} 
                </div>
            </div>
        </BasicLayout>
    );

}

export default JoinPage;
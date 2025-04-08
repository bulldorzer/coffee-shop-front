/**
 * 회원가입 화면 2 :  - 나영일
 * @returns 
 */

const JoinPage = () => {

    return (
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
                    <option value="naver.com">naver.com</option>  
                    <option value="gmail.com">gmail.com</option>  
                </select><br/>
                <label>* 비밀번호</label><input/><br/>
                <label>* 비밀번호 확인</label><input/><br/>
                <label>* 이름</label><input/><br/>
                <label>* 휴대폰 번호</label><input/><br/>
                <label>* 주소</label><input/><button>우편번호 검색</button><br/>
                <label>* 상세 주소</label><input/><br/>
                <input type="checkbox"/><label>정보/이벤트 수신에 동의합니다.</label><br/>
                <button>이전단계</button>
                <button>회원가입</button>
            </div>
        </div>
    );

}

export default JoinPage;
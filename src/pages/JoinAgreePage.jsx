/**
 * 회원가입 화면 1 : 약관 동의 화면 - 나영일
 * @returns 
 */

const JoinAgreePage = () => {

    return (
        <div>
            <div>
                <h1>회원가입</h1>
                <span>01 약관동의 &gt;</span>   {/* &gt; = '>' 기호 표시 */}
                <span>02 정보입력</span>
                <hr/>
            </div>
            <div>
                <h2>약관 동의</h2>
                <hr/>
                <input type="checkbox"/><label>모든 약관을 확인하고 전체 동의합니다.</label><br/>
                <input type="checkbox"/><label>(필수) 이용 약관</label><br/>
                <textarea>이용 약관</textarea><br/>
                <input type="checkbox"/><label>(필수) 개인정보 수집 및 이용</label><br/>
                <textarea>개인정보 수집 및 이용</textarea><br/>
                <button>다음단계</button>
            </div>

        </div>
    );

}

export default JoinAgreePage;
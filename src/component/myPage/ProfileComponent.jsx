// 회원정보 수정 - 이재민
const ProfileComponent = () => {

    return(
        <div>
            <label>* 이메일ID</label><input/>
            <span>@</span>
            <select>
                <option>직접입력</option>                              
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
            <label>* 주소</label><input/><button>우편번호 검색</button><br/>           
            <label>* 상세 주소</label><input/><br/>
            <input type="checkbox"/><label>정보/이벤트 수신에 동의합니다.</label><br/>
            <button>변경하기</button>   
        </div>
    )
}

export default ProfileComponent;
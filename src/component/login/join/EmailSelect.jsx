
/**
 * 이메일 도메인 선택 컴포넌트 - 나영일
 * @param {value, onChange}  
 * @returns 
 */

const EmailSelect = ({ value, onChange }) => {
    return (
        <select value={value} onChange={onChange}>
            <option>직접입력</option>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="daum.net">daum.net</option>
            <option value="nate.com">nate.com</option>
        </select>
    );
};

export default EmailSelect;
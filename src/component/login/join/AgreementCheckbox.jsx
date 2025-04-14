
/**
 * 체크박스 + 라벨 묶음 컴포넌트 - 나영일
 * @param {label, required, checked, onChange}
 * @returns 
 */

const AgreementCheckbox = ({ label, required = false, checked, onChange }) => {

    return (
        <div>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <label>{required ? '(필수) ' : ''}{label}</label>
        </div>
    );
};

export default AgreementCheckbox;

/**
 * 라벨이 붙은 input 컴포넌트 - 나영일
 * @param {label, required, children} 
 * @returns 
 */

const LabeledInput = ({ label, required = false, children }) => {
    return (
        <div>
            <label>{required ? '* ' : ''}{label}</label>
            {children || <input />}
        </div>
    );
};

export default LabeledInput;
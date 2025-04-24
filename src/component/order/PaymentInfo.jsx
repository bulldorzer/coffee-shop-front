import { useEffect, useState } from "react";


const PaymentInfo = ({loginMember, productPrice, deliveryFee, total, onFinalAmountChange,usePoint}) => {

    const [useMileage, setUseMileage] = useState(0); // 마일리지 사용 금액 상태 관리
    const [useAllMileage, setUseAllMileage] = useState(false); // 전액 사용 체크 상태 관리

    useEffect(() =>{
        const final = total - useMileage; // 최종 결제 금액 계산
        onFinalAmountChange(final < 0 ? 0 : final); // 부모 컴포넌트에 최종 결제 금액 전달 음수방지
        usePoint = useMileage; // 사용 포인트 설정
    },[useMileage, total, onFinalAmountChange, usePoint]); // useMileage, total이 변경될 때마다 실행

    // 마일리지 모두사용 체크박스 이벤트관리
    const handleCheckboxChange = (e) => {
        const checked = e.target.checked; // 체크박스 상태
        setUseAllMileage(checked);
        if (checked){
            setUseMileage(loginMember.point || 0); // 보유 마일리지 전액 사용
        } else {
            setUseMileage(0); // 마일리지 사용 금액 초기화

        }
    }

    const handleMileageChange = (e) => {
        let value = parseInt(e.target.value.replace(/\D/g, ""),10); // 숫자만 입력받기
        if (isNaN(value)) value = 0; // NaN일 경우 0으로 초기화
        if (value > loginMember.point) {
            value = loginMember.point; // 보유 마일리지 초과시 보유 마일리지로 설정
        }
        setUseMileage(value); // 마일리지 사용 금액 설정
        usePoint(value); // 사용 포인트 설정
    }

    return (
        <section>
            {/* 결제 정보 */}
            <h2 className="title">결제 정보</h2>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label>상품 합계 금액</label>
                    <span>{productPrice.toLocaleString()}(원)</span>
                </div>
                <div className="flex items-center justify-between">
                    <label>배송비</label>
                    <span>{deliveryFee.toLocaleString()}(원)</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <label>마일리지 사용</label>
                    <input 
                        className="border px-2 py-1" 
                        type="text"
                        value={useMileage.toLocaleString()}
                        onChange={handleMileageChange}
                        disabled={useAllMileage} />
                    <label>
                        <input 
                            type="checkbox"
                            checked={useAllMileage}
                            onChange={handleCheckboxChange} /> 전액 사용하기 (보유 마일리지 : {loginMember.point?.toLocaleString()}원)
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <label>최종 결제 금액</label>
                    <span>{(total - useMileage).toLocaleString()}(원)</span>
                </div>
            </div>
        </section>
    );
}

export default PaymentInfo;
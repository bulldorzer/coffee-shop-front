

const PaymentInfo = () => {
    return (
        <section>
            {/* 결제 정보 */}
            <h2 className="title">결제 정보</h2>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label>상품 합계 금액</label>
                    <span>{}(원)</span>
                </div>
                <div className="flex items-center justify-between">
                    <label>배송비</label>
                    <span>(원)</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <label>마일리지 사용</label>
                    <input className="border px-2 py-1" type="text" />
                    <label><input type="checkbox" /> 전액 사용하기 (보유 마일리지 : 00원)</label>
                </div>
                <div className="flex items-center justify-between">
                    <label>최종 결제 금액</label>
                    <span>(원)</span>
                </div>
            </div>
        </section>
    );
}

export default PaymentInfo;
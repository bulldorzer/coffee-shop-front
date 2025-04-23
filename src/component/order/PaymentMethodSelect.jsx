

const PaymentMethodSelect = () => {
    return (
        <section>
            <h2 className="font-bold">결제 수단</h2>
            <div className="flex gap-8">
                <label><input type="radio" name="pay" /> 신용/체크 카드</label>
                <label><input type="radio" name="pay" /> 계좌 이체</label>
            </div>
            <div className="border p-4 mt-4 text-right text-lg font-bold">
            최종 결제 금액 : 원
            </div>
            <div className="mt-4">
                <label><input type="checkbox" /> (필수) 구매하실 상품의 결제 정보를 확인하였으며, 구매 진행에 동의합니다.</label>
            </div>
            <div className="mt-4 flex justify-center gap-4">
                <button className="order-button">취소</button>
                <button className="order-button">결제</button>
            </div>
        </section>
    );
}
export default PaymentMethodSelect;
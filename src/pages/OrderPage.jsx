import BasicLayout from "../layouts/BasicLayout"


/**
 * 주문서 화면 - 진우
 * @returns 
 */
const OrderPage = () =>{
    return(
        <BasicLayout>
            {/* 상품 목록 */}
            <section className="border border-black">
                {/* 공통 컴포넌트로 대체예정 */}
                <h2 className="text-base font-bold border-b border-black p-2">주문서 작성 / 결제 정보 입력</h2>
                <hr></hr>
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-100">
                        <tr className="border-b border-black">
                            <th className="w-1/3 border-r border-black p-2">상품정보</th>
                            <th className="w-1/6 border-r border-black">수량</th>
                            <th className="w-1/6 border-r border-black">금액</th>
                            <th className="w-1/6 p-2">적립포인트</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map((_, i) => (
                        <tr key={i} className="border-b border-black">
                            <td className="flex p-2 gap-4 border-r border-black">
                                <div className="w-24 h-24 bg-gray-300" />
                                <div>
                                    <p>{"{상품명}"}</p>
                                    <p>- 옵션명</p>
                                    <p>- 옵션명</p>
                                </div>
                            </td>
                            <td className="border-r border-black align-top p-2">{"{수량}"} 개</td>
                            <td className="border-r border-black align-top p-2">{"{금액}"} 원</td>
                            <td className="align-top p-2">{"{포인트}"} 원</td>
                        </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-yellow-300 text-center font-bold">
                            <td colSpan={4}>목록 생략</td>
                        </tr>
                        <tr className="text-right">
                            <td colSpan={4} className="p-2">
                                총 합계: 개 | 금액: 원 | 적립 포인트: 원
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </section>

            {/* 주문자 정보 */}
            <section>
                <h2 className="font-bold">주문자 정보</h2>
                <div className="space-y-2">
                    <div className="flex items-center gap-4">
                        <label>*이름</label>
                        <input className="border px-2 py-1 flex-1" type="text" />
                    </div>
                    <div className="flex items-center gap-4">
                        <label>*휴대폰 번호</label>
                        <input className="border px-2 py-1 flex-1" type="text" />
                        <span>배송 안내 SMS로 알려드립니다.</span>
                    </div>
                </div>
            </section>

            {/* 배송 정보 */}
            <section>
                <h2 className="font-bold">배송 정보</h2>
                <div className="space-y-2">
                    <div className="flex items-center gap-4">
                        <label>*수령인</label>
                        <input className="border px-2 py-1 flex-1" type="text" />
                        <span>0자 / 25자</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <label>*휴대폰 번호</label>
                        <input className="border px-2 py-1 flex-1" type="text" />
                        <span>상품 도착 안내를 SMS로 알려드립니다</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <label>*주소</label>
                        <input className="border px-2 py-1 w-1/3" type="text" />
                        <button className="bg-black text-white px-4 py-1">주소검색</button>
                        <input className="border px-2 py-1 flex-1" type="text" placeholder="상세주소" />
                    </div>
                    <div>
                        <label>*배송 요청 사항</label>
                        <textarea className="border px-2 py-1 w-full h-24" />
                        <span className="block text-right">0자 / 100자</span>
                    </div>
                </div>
            </section>

            {/* 결제 정보 */}
            <section>
                <h2 className="font-bold">결제 정보</h2>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label>상품 합계 금액</label>
                        <span>(원)</span>
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

            {/* 결제 수단 및 버튼 */}
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
                    <button className="border px-4 py-2">취소</button>
                    <button className="border px-4 py-2">결제</button>
                </div>
            </section>
    
        </BasicLayout>
    )
}

export default OrderPage;
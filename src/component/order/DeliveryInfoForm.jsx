const DeliveryInfoForm = ({ orderInfo, setOrderInfo, handleAddressSearch }) => (
  <section>
    <h2 className="title">배송 정보</h2>
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <label>*수령인</label>
        <input className="border px-2 py-1 flex-1" type="text" value={orderInfo.receiverName}
          onChange={e => setOrderInfo({ ...orderInfo, receiverName: e.target.value })} />
        <span>0자 / 25자</span>
      </div>
      <div className="flex items-center gap-4">
        <label>*휴대폰 번호</label>
        <input className="border px-2 py-1 flex-1" type="text" value={orderInfo.receiverPhone}
          onChange={e => setOrderInfo({ ...orderInfo, receiverPhone: e.target.value })} />
        <span>상품 도착 안내를 SMS로 알려드립니다</span>
      </div>
      <div className="flex items-center gap-4">
        <label>*주소</label>
        <input className="border px-2 py-1 w-1/3" type="text" value={orderInfo.address}
          onChange={e => setOrderInfo({ ...orderInfo, address: e.target.value })} />
        <button className="order-button" onClick={handleAddressSearch}>주소검색</button>
        <input className="border px-2 py-1 flex-1" type="text" placeholder="상세주소"
          value={orderInfo.addressDetail}
          onChange={e => setOrderInfo({ ...orderInfo, addressDetail: e.target.value })} />
      </div>
      <div>
        <label>*배송 요청 사항</label>
        <textarea className="border px-2 py-1 w-full h-24"
          value={orderInfo.deliveryRequest}
          onChange={e => setOrderInfo({ ...orderInfo, deliveryRequest: e.target.value })} />
        <span className="block text-right">0자 / 100자</span>
      </div>
    </div>
  </section>
);

export default DeliveryInfoForm;
